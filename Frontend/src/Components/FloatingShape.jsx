import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};
export default FloatingShape;

//  <FloatingShape
//         color="bg-green-500"
//         size="w-64 h-64"
//         top="-5%"
//         left="10%"
//         delay={0}
//       />
//       <FloatingShape
//         color="bg-emerald-500"
//         size="w-48 h-48"
//         top="70%"
//         left="80%"
//         delay={5}
//       />
//       <FloatingShape
//         color="bg-lime-500"
//         size="w-32 h-32"
//         top="40%"
//         left="-10%"
//         delay={2}
//       />
//       {/* Animation */}
