import { User } from "@prisma/client";
import React from "react";


export interface UserContextType {
  user: User | null; // Define the type of your user object here
  setUser: React.Dispatch<any>; // Define the type of your setUser function here

}

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;
