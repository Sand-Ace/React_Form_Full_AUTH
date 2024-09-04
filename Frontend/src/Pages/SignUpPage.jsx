import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import Input from "../Components/Input.jsx";
import Button from "../UI/Button";
import { motion } from "framer-motion";

const SignUpPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form>
          <Input icon={User} type="text" placeholder="Full Name" />
          <Input icon={Mail} type="email" placeholder="Email Address" />
          <Input icon={Lock} type="password" placeholder="Password" />
          <Button>Sign up</Button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:text-green-600">
            login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
