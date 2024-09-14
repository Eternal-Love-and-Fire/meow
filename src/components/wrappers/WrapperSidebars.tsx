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
    <div className="mx-auto px-4 lg:px-0 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="col-span-1 flex justify-center">
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

        <div className="col-span-1 flex justify-center">{children}</div>

        <div className="col-span-1">{/* Add content here if needed */}</div>
      </div>
    </div>
  );
};

export { WrapperSidebars };
