import React from "react";
import "../../styles/Layout.css";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-navbar"></div>
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
