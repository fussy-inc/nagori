import { FC, PropsWithChildren } from "react";
import { layoutStyle } from "~/css/_layout.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={layoutStyle} role={"layout"}>
      {children}
    </div>
  );
};

export default Layout;
