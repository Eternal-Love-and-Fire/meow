import Link from "next/link";
import { CSSProperties } from "react";

type MenubarProps = {
  items: Array<{ text: string; href: string; state?: "active" }>;
  listStyle?: CSSProperties;
  listItemStyle?: CSSProperties;
};

const Menubar = (props: MenubarProps) => {
  const { items, listStyle, listItemStyle } = props;

  return (
    <ul className="flex items-center gap-2" style={listStyle}>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={`min-w-16 px-2 flex justify-center tracking-wider rounded-sm
              active:bg-[rgba(0,0,0,0.1)] active:text-[rgba(0,0,0,0.65)] 
              hover:text-[rgba(255,255,255,0.85)] hover:bg-[rgba(0,0,0,0.75)] 
              duration-500 
              dark:hover:text-[rgba(0,0,0,0.85)] dark:hover:bg-[rgba(255,255,255,0.75)] 
              dark:active:bg-[rgba(255,255,255,0.1)] dark:active:text-[rgba(255,255,255,0.65)]
              ${item.state === "active" ? "shadow-[0_4px_2px_-2px_white] dark:shadow-[0_4px_2px_-2px_gray]" : ""}`}
            style={listItemStyle}
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export { Menubar };
