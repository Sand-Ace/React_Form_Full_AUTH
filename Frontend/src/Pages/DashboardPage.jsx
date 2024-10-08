import { motion } from "framer-motion";

import Button from "../UI/Button";

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-sm shadow-2xl border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        DashBoard
      </h2>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border-gray-700"
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: DUMMYNAME</p>
          <p className="text-gray-300">EMAIL: DUMMYEMAIL</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border-gray-700"
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined : </span>
            DUMMY_DATE
          </p>
          <p className="text-gray-300">
            <span className="font-bold">LastLogin : </span>
            DUMMY_DATE
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <Button>Log out</Button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
