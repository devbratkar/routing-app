import { createContext, useReducer } from "react";

interface ContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

interface ActionType {
  type: "LOADING";
  payload: any;
}

interface PropType {
  children: JSX.Element | string | undefined;
}

interface InitialStateType {
  loading: boolean;
}

export const GlobalContext = createContext<ContextType>({
  state: {},
  dispatch: () => null,
});

const initialState: InitialStateType = {
  loading: true,
};

const reducers = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING": {
      state.loading = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export const GlobalContextProvider: React.FC<PropType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
