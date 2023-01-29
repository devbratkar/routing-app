import { createContext, useReducer } from "react";

interface ContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

interface ActionType {
  type:
    | "ADD_ROUTE"
    | "REMOVE_ROUTE"
    | "UPDATE_ROUTE"
    | "UPDATE_MODE"
    | "DELETE_ROUTE";
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
}

interface InitialStateType {
  routing: Routing[];
  index: number;
  mode: "ADD" | "UPDATE";
}

export const RoutingContext = createContext<ContextType>({
  state: {},
  dispatch: () => null,
});

const initialState: InitialStateType = {
  routing: [],
  index: 0,
  mode: "ADD",
};

const reducers = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ROUTE": {
      state.routing[payload?.id] = {
        id: payload?.id,
        protected: payload?.protected,
        dynamic: payload?.dynamic ?? "",
        component: payload?.component,
        path: payload?.path,
        isDynamic: payload?.isDynamic ?? false,
      };
      state.index = payload?.id + 1;
      return { ...state };
    }
    case "UPDATE_ROUTE": {
      state.routing[payload.id] = {
        ...state.routing[payload.id],
        ...payload,
      };
      state.mode = "ADD";
      state.index = state.routing.length;
      return { ...state };
    }
    case "UPDATE_MODE": {
      state.mode = "UPDATE";
      state.index = payload?.id;
      return { ...state };
    }
    case "DELETE_ROUTE": {
      state.routing =
        state?.routing?.filter((item) => item?.id !== payload?.id) ?? [];
      state.index = state.routing.length;
      return { ...state };
    }
    default:
      return state;
  }
};

export const RoutingAppContextProvider: React.FC<PropType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <RoutingContext.Provider value={{ state, dispatch }}>
      {children}
    </RoutingContext.Provider>
  );
};
