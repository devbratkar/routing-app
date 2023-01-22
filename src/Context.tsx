import { createContext, useReducer } from "react";

interface ContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

interface ActionType {
  type: "ADD_ROUTE" | "REMOVE_ROUTE" | "UPDATE_ROUTE";
  payload: any;
}

interface PropType {
  children: JSX.Element | string | undefined;
}

interface Routing {
  id: number;
  protected: string;
  dynamic: string;
  component: string;
  path: string;
  isDynamic: boolean;
  isExact: boolean;
}

interface InitialStateType {
  routing: Routing[];
}

export const GlobalContext = createContext<ContextType>({
  state: {},
  dispatch: () => null,
});

const initialState: InitialStateType = {
  routing: [
    {
      id: 0,
      protected: "false",
      dynamic: "",
      component: "",
      path: "",
      isDynamic: false,
      isExact: false,
    },
  ],
};

const reducers = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ROUTE": {
      const ifRowDontExist = !state?.routing?.find(
        (item) => item?.id === payload?.index
      );
      if (ifRowDontExist) {
        state.routing.push({
          id: payload?.index,
          protected: "false",
          dynamic: "",
          component: "",
          path: "",
          isDynamic: false,
          isExact: false,
        });
      }
      return { ...state };
    }
    case "REMOVE_ROUTE": {
      state?.routing?.slice(payload, 1);
      return { ...state };
    }
    case "UPDATE_ROUTE": {
      state.routing[payload.index] = {
        ...state.routing[payload.index],
        ...payload?.data,
      };
      return { ...state };
    }
    default:
      return state;
  }
};

export const ContextProvider: React.FC<PropType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
