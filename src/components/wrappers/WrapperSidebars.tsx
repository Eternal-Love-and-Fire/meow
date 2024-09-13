import Link from "next/link";
import { ReactNode } from "react";

type WrapperSidebarsProps = {
  children: ReactNode;
};

const WrapperSidebars = ({ children }: WrapperSidebarsProps) => {
  return (
    <div className="w-full flex justify-between">
      <aside className="max-w-60 h-full p-4">
        <ul>
          <li className="font-semibold">Getting Started</li>
          <li>
            <ul className="p-2">
              <li>
                <Link
                  href={`/components/headers`}
                  className="capitalize opacity-80 border-b-2 border-transparent hover:border-black hover:dark:border-white duration-500"
                >
                  Headers
                </Link>
              </li>
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
