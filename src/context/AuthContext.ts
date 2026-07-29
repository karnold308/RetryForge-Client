import { createContext } from "react";
import type { AuthContextType } from "../models/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;