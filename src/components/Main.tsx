import { ReactNode } from "react";

const Main = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className="w-full h-[100px]" />
      <main style={{ padding: 0, width: "100%" }}>{children}</main>
    </>
  );
};

export default Main;
