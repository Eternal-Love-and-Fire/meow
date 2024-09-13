import { WrapperInnerWindow } from "@/components/wrappers/WrapperInnerWindow";
import { Header4 } from "@/components/header/Header4";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperInnerWindow
      desc={{ title: "Headers", explanation: "Headers components" }}
    >
      <Header4 />
      {children}
    </WrapperInnerWindow>
  );
}
