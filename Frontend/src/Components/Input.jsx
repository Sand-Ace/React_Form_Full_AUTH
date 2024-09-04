import { motion } from "framer-motion";

const Input = ({ icon: Icon, type, placeholder, ...props }) => {
  const MotionIcon = motion(Icon);
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MotionIcon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="size-5 text-green-500"
        />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
