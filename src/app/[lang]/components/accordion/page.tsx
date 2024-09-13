"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}
interface Item {
    title: string;
    content: string;
  }
const items: Item[] = [
    {
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      title: "Is it styled?",
      content: "Yes. It comes with default styles that match the aesthetic.",
    },
    {
      title: "Is it animated?",
      content: "Yes. It's animated by default with Framer Motion.",
    },
  ];

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  content,
  isOpen,
  onClick,
}) => (
  <div className="border-b">
    <h3>
      <button
        id={`${id}-header`}
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
      >
        <span>{title}</span>
        <div
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <div className="w-2 h-2 border-b-2 border-r-2 transform -rotate-45 border-current"></div>
        </div>
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-header`}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { height: "auto", opacity: 1 },
            collapsed: { height: 0, opacity: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-4">{content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


const Page: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={`accordion-item-${index}`}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Page;
