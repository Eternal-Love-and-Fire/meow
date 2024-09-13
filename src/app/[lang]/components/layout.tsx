// import { WrapperInnerWindow } from "@/components/wrappers/WrapperInnerWindow";
import { WrapperSidebars } from "@/components/wrappers/WrapperSidebars";

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WrapperSidebars>
      {/* <WrapperInnerWindow
        desc={{ title: "Headers", explanation: "Headers components" }}
      > */}
      {children}
      {/* </WrapperInnerWindow> */}
    </WrapperSidebars>
  );
};

export default ComponentsLayout;
