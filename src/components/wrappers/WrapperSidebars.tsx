import Link from "next/link";
import { ReactNode } from "react";

type WrapperSidebarsProps = {
  children: ReactNode;
};

const paths = [
  { name: "Accordion", path: "/components/accordion" },
  { name: "Alert", path: "/components/alert" },
  { name: "Alert Dialog", path: "/components/alert-dialog" },
  { name: "Avatar", path: "/components/avatar" },
  { name: "Breadcrumb", path: "/components/breadcrumb" },
  { name: "Button", path: "/components/button" },
  { name: "Calendar", path: "/components/calendar" },
  { name: "Carousel", path: "/components/carousel" },
  { name: "Chart", path: "/components/chart" },
  { name: "Checkbox", path: "/components/checkbox" },
  { name: "Context Menu", path: "/components/context-menu" },
  { name: "Drawer", path: "/components/drawer" },
  { name: "Form", path: "/components/form" },
  { name: "Hover Card", path: "/components/hover-card" },
  { name: "Input", path: "/components/input" },
  { name: "Pagination", path: "/components/pagination" },
];

const WrapperSidebars = ({ children }: WrapperSidebarsProps) => {
  return (
    <div className="w-full flex justify-between">
      <aside className="max-w-60 h-full p-4">
        <ul>
          <li className="font-semibold">Getting Started</li>
          <li>
            <ul className="p-2">
              {paths.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="capitalize opacity-80 border-b-2 border-transparent hover:border-black hover:dark:border-white duration-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>
      {children}
      <aside className="max-w-60 h-full p-4">
        <p>On this page</p>
        <ul>
          <li>Header 1</li>
          <li>Header 2</li>
          <li>Header 3</li>
          <li>Header 4</li>
          <li>Header 5</li>
          <li>Header 6</li>
        </ul>
      </aside>
    </div>
  );
};

export { WrapperSidebars };
