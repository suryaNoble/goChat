// const AuthImagePattern = ({ title, subtitle }) => {
//   return (
//     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//       <div className="max-w-md text-center">
//         <div className="grid grid-cols-3 gap-3 mb-8">
//           {[...Array(9)].map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square rounded-2xl bg-primary/10 ${
//                 i % 2 === 0 ? "animate-pulse" : ""
//               }`}
//             />
//           ))}
//         </div>
//         <h2 className="text-2xl font-bold mb-4">{title}</h2>
//         <p className="text-base-content/60">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-12 relative overflow-hidden">
      {/* Animated floating shapes in the background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Dynamic grid pattern with hover effects */}
        <div className="grid grid-cols-3 gap-4 mb-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl transition-all duration-300 hover:rounded-full ${
                i % 3 === 0
                  ? "bg-primary/20 hover:bg-primary/30"
                  : i % 2 === 0
                  ? "bg-secondary/20 hover:bg-secondary/30"
                  : "bg-accent/20 hover:bg-accent/30"
              } ${i % 4 === 0 ? "animate-bounce" : "animate-pulse"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Text content with better typography */}
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          {title}
        </h2>
        <p className="text-lg text-base-content/70 mb-6">{subtitle}</p>

        {/* Decorative animated border */}
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      </div>

      {/* Add these keyframes to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;
