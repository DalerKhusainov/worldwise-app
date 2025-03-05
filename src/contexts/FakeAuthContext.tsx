import { createContext, ReactNode, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
}

type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string
};

type State = {
  user: UserType | null;
  isAuthenticated: boolean;
};

type Action = { type: "login"; payload: UserType | null } | { type: "logout" };

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
        dispatch({type: "login", payload: FAKE_USER})
    }
  }

  function logout() {
    dispatch({type: "logout"})
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }
  return authContext;
}

export { AuthProvider, useAuth };
