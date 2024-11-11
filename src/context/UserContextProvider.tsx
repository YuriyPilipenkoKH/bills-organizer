"use client"

import React, { ReactNode, useState } from 'react'
import UserContext from './UserContext'
import { User } from '@prisma/client'


function UserContextProvider({children} : {children:ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 

      }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
