import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../Components/Input";

import Button from "../UI/Button";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md w-full mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome back
        </h2>

        <form>
          <Input icon={Mail} type="email" placeholder="Email Address" />
          <Input icon={Lock} type="password" placeholder="Password" />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-green-400 hover:text-green-600"
            >
              Forgot password?
            </Link>
          </div>
          {/* <p>Error</p> */}

          <Button>Login</Button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don&apos;t have and account?{" "}
          <Link to="/signup" className="text-green-400 hover:text-green-600">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
