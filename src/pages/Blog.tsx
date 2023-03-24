import { motion } from "framer-motion";

import Background from "../components/Background";
import Main from "../components/Main";
import TransitionAnimation from "../components/TransitionAnimation";

const Blog = () => {
  return (
    <TransitionAnimation>
      <Background />
      <Main>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ stiffness: 260, damping: 20, duration: 0.6 }}
        >
          <h3 className="font-bold text-4xl text-center mt-[50px]">BLOG</h3>
          <center className="mt-10">Coming Soon...</center>
        </motion.div>
      </Main>
    </TransitionAnimation>
  );
};

export default Blog;
