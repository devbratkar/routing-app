import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router";

import RoutingForm from "../../component/RoutingForm/RoutingForm";
import { RoutingContext } from "../../context/RoutingAppContext";
import { createRoutings, download } from "../../Services/routingServices";
import "../../styles/Routing.css";

interface AuthGuardProps {
  children: JSX.Element;
}

interface InitialStateProps {
  state: any;
  dispatch: () => null;
}

interface Actions {
  type: string;
  payload: any;
}

function generateFiles(data: any[]) {
  const date = new Date();
  const time = `-${date.toDateString()}-${date.toLocaleTimeString()}`;
  const file = createRoutings(data).join("");
  download(`Routing ${time}.jsx`, file);
}

const AuthContext = createContext({});

const authReducer = (state: InitialStateProps, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case "login": {
      state.state.login = true;
      return { ...state };
    }
    case "logout": {
      state.state.login = false;
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

const initialState: InitialStateProps = {
  state: {},
  dispatch: () => null,
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  if (!state?.state?.login) return navigate("/");

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const Home = () => {
  const {
    state: { routing },
    dispatch,
  } = useContext(RoutingContext);

  const isGenerateCodeDisabled = !routing?.length;

  return (
    <div className="routing">
      <div className="routing-input">
        <RoutingForm />
      </div>
      <div className="routing-lists">
        <Table className="routing-table">
          <TableHead className="routing-head">
            <TableRow className="routing-head-row">
              <TableCell width={50}>S.No.</TableCell>
              <TableCell width={150}>Route</TableCell>
              <TableCell width={200}>Path</TableCell>
              <TableCell width={200}>Component</TableCell>
              <TableCell width={200}>Dynamic</TableCell>
              <TableCell width={150}>Is Dynamic?</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="routing-body">
            {!!routing?.length &&
              routing?.map((item: any, index: number) => (
                <TableRow key={index} className="routing-body-row">
                  <TableCell>{item?.id + 1}</TableCell>
                  <TableCell>
                    {item?.protected === "true"
                      ? "Protected Route"
                      : "Open Route"}
                  </TableCell>
                  <TableCell>{item?.path}</TableCell>
                  <TableCell>{`<${item?.component} />`}</TableCell>
                  <TableCell>{item?.dynamic || "-"}</TableCell>
                  <TableCell>{`${String(item?.isDynamic)}`}</TableCell>
                  <TableCell>
                    <button
                      className="action-btn action-edit"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_MODE",
                          payload: { id: item?.id },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn action-delete"
                      onClick={() =>
                        dispatch({
                          type: "DELETE_ROUTE",
                          payload: { id: item?.id },
                        })
                      }
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <button
        className="routing-generate-btn"
        onClick={() => generateFiles(routing)}
        disabled={isGenerateCodeDisabled}
      >
        Generate Code
      </button>
    </div>
  );
};

export default Home;
