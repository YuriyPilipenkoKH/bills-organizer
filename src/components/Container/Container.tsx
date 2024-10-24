"use client"

import React, { ReactNode } from 'react'
import { MContainer } from './Container.styled'


const Container =({children} : {children:ReactNode})  => {
    return (
            <MContainer
            className='container'>
                {children}
            </MContainer>
    ) 
}
export default Container