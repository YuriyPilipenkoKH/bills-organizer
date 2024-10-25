'use client'
import { CancelBtn } from '@/components/Button/Button'
import { AddNewCollectionForm } from '@/components/forms/AddNewCollectionForm'
import React, { useState } from 'react'
import { BiDownArrow } from "react-icons/bi";

function DashboardPage() {
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

export default DashboardPage