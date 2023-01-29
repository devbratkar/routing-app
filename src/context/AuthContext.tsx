import { createContext, useReducer } from "react";
import { useNavigate } from "react-router";

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

const AuthContext = createContext({});

const authReducer = (state: InitialStateProps, action: Actions) => {
  const { type } = action;
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

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  if (!state?.state?.login) return navigate("/");

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
