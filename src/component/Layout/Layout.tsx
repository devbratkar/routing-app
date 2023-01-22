import React, { useContext } from "react";
import { GlobalContext } from "../../Context";
import "../../styles/Layout.css";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { state } = useContext(GlobalContext);
  return (
    <div className="layout">
      <div className="layout-navbar"></div>
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
