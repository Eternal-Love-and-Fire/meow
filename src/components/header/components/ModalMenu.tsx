import { motion, AnimatePresence } from "framer-motion";
import { Logotype } from "./Logotype";
import { Menubar } from "./Menubar";
import { useTheme } from "@/app/context/ThemeProvider";

const modalVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

type ModalMenuProps = {
  toggleModalVisibility: () => void;
  showModalMenu: boolean;
  items: Array<{ text: string; href: string; state?: "active" }>;
};

const ModalMenu = (props: ModalMenuProps) => {
  const { toggleModalVisibility, showModalMenu, items } = props;
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {showModalMenu ? (
        <motion.div
          className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] z-[9999]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          onClick={toggleModalVisibility}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full md:w-2/3 lg:w-1/2 max-w-96 h-screen p-4 flex flex-col gap-4 border-r-2 bg-white dark:bg-black"
          >
            <div className="my-6 flex justify-between items-center">
              <Logotype />
              <button
                onClick={toggleModalVisibility}
                className="w-6 h-6 hover:opacity-50 active:opacity-20 duration-500"
              >
                <svg
                  viewBox="0 0 12 12"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="11"
                    x2="11"
                    y2="1"
                    stroke={`${theme === "dark" ? "white" : "black"}`}
                    strokeWidth="2"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="11"
                    y2="11"
                    stroke={`${theme === "dark" ? "white" : "black"}`}
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            <Menubar
              items={items}
              listStyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1.5rem",
              }}
              listItemStyle={{
                justifyContent: "flex-start",
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { ModalMenu };
