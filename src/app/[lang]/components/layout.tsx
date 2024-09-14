import { WrapperSidebars } from "@/components/wrappers/WrapperSidebars";

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <WrapperSidebars>{children}</WrapperSidebars>
  );
};

export default ComponentsLayout;
