import { Header } from "@/components/header/Header";
import { Header4 } from "@/components/header/Header4";
import { HeaderAuth } from "@/components/header/HeaderAuth";
import { HeaderCenter } from "@/components/header/HeaderCenter";
import { WrapperInnerWindow } from "@/components/wrappers/WrapperInnerWindow";
import { WrapperSidebars } from "@/components/wrappers/WrapperSidebars";

const Page = () => {
  return (
    <WrapperSidebars>
      <WrapperInnerWindow
        desc={{ title: "Headers", explanation: "Headers components" }}
      >
        <div className="min-w-screen">
          <Header />
          <div className="border-b-2 border-black dark:border-white w-full h-2"></div>
          <HeaderAuth />
          <div className="border-b-2 border-black dark:border-white w-full h-2"></div>
          <HeaderCenter />
          <div className="border-b-2 border-black dark:border-white w-full h-2"></div>
          <Header4 />
        </div>
      </WrapperInnerWindow>
    </WrapperSidebars>
  );
};

export default Page;
