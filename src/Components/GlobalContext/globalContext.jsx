// GlobalContext.jsx

import react ,{ createContext, useState ,useEffect} from "react";
import { checkJwtCookie } from "../Jwt_verify/checkJwtCookie.jsx";

// Creating a Context
export const GlobalContext = createContext();


// Context Provider Component
export function GlobalContextProvider({ children }) {
  const checker = ()=>{
    const isLoggedIn = checkJwtCookie({ returnme: "buttonStatus" });
    // Check if JWT exists in cookies and update the account status accordingly
    console.log("testing",isLoggedIn);
    if (isLoggedIn) {
      return {status : "Logout",
        role:isLoggedIn.jwtPayload.role,
        reg:isLoggedIn.jwtPayload.reg,
      };
    } else {
      return "Login";
    }
  }

  return (
    <GlobalContext.Provider value={{ checker }}>
      {children}
    </GlobalContext.Provider>
  );
}
