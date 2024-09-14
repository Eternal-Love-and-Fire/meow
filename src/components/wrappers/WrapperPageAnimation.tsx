"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function WrapperPageAnimation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const transition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { WrapperPageAnimation };
