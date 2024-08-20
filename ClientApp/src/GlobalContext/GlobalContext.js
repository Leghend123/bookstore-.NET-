import React, { useReducer, createContext } from "react";

const initState = {
  isLogin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ISLOGIN":
      return { ...state, isLogin: action.payload };
      
    default:
      return { ...state };
  }
};

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const isLoginHandler = (data) => {
    dispatch({
      type: "ISLOGIN",
      payload: data,
    });
  };

  return (
    <GlobalContext.Provider value={{ isLogin: state.isLogin, isLoginHandler }}>
      {children}
    </GlobalContext.Provider>
  );
};
