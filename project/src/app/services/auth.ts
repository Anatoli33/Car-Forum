import { getAuth } from "firebase/auth";
import { app } from "./firebase";

export const Auth = getAuth(app); 