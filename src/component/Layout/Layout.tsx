import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import "../../styles/Layout.css";
import Loader from "../Loader/Loader";

type Props = {
  children: JSX.Element;
};

let loadingTimeout: any = null;

const Layout: React.FC<Props> = ({ children }) => {
  const {
    state: { loading },
    dispatch,
  } = useContext(GlobalContext);
  const location = useLocation().pathname;

  const loader = async () => {
    await new Promise((resolve) => {
      loadingTimeout = setTimeout(resolve, 1000);
    });
    dispatch({ type: "LOADING", payload: false });
  };

  useEffect(() => {
    dispatch({ type: "LOADING", payload: true });
    loader();

    return () => {
      clearTimeout(loadingTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="layout">
      <div className="layout-navbar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "layout-nav-link active" : "layout-nav-link"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "layout-nav-link active" : "layout-nav-link"
          }
          to="/routing-app"
        >
          Routing App
        </NavLink>
      </div>
      <div className="layout-content">{loading ? <Loader /> : children}</div>
    </div>
  );
};

export default Layout;
