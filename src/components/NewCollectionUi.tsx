'use client'

import React, { useState } from 'react'
import { CancelBtn } from './Button/Button'
import { BiDownArrow } from 'react-icons/bi'
import { AddNewCollectionForm } from './forms/AddNewCollectionForm'

function NewCollectionUi() {
    const [open, setOpen] = useState(false)
  return (
    <div className='w-full grid gap-2'>
    <CancelBtn className='text-slate-200'
        onClick={()=> setOpen(!open)}>
            {open ? 'Proceed' :'Add new collection'}
            {open 
                ?  <BiDownArrow  className='r180' /> 
                : <BiDownArrow className=''/>
                }
    </CancelBtn>
            {open && <AddNewCollectionForm />}
    </div>
  )
}

export default NewCollectionUi