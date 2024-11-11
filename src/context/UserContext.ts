import { User } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";


export interface UserContextType {
  user: User | null; // Define the type of your user object here
  setUser: Dispatch<SetStateAction<User | null>> // Define the type of your setUser function here

}

const UserContext = React.createContext<UserContextType | null>(null);

export default UserContext;
