import { getReceiverSocketId, io } from '../lib/socket.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

import  cloudinary  from '../lib/cloudinary.js';

export const getUsers = async (req, res) => {
    try {
       
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMessages = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const {id:otherUserId} = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: loggedInUserId }
            ]
         });

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('messageController lo getMessages');
        
    }
}


export const sendMessage = async (req,res)=>{

    try {

        const {text,image} = req.body;
        
        const {id:receiverId} = req.params; //renaming id in message_routes to receiverId

        const senderId = req.user._id

        let imageUrl;
        if(image){
        const uploadResponse = await cloudinary.uploader.upload(image).catch(err => {
            console.error("Image upload failed:", err);
            return { secureUrl: null }; // Return a default object if upload fails
        });
        imageUrl = uploadResponse.secure_url || null; // Ensure imageUrl is null if upload fails

        }
        console.log('this is imageurl',imageUrl)
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }
        res.status(201).json(newMessage);

        
    } catch (error) {
        console.log(error.message);
        console.log("send message in messagecontroller");
        res.status(500).json({message:"Internal server error"})
    }
}
