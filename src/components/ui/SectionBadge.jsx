import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';

export function SectionBadge({ children, className = "", texts = null }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-8 py-4 rounded-full text-lg font-semibold ${className}`}
    >
      {texts ? (
        <Typewriter
          options={{
            strings: texts,
            autoStart: true,
            loop: true,
            deleteSpeed: 30,
            delay: 50,
          }}
        />
      ) : (
        children
      )}
    </motion.span>
  );
}
