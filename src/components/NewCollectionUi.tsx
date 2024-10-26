'use client'

import React, { useState } from 'react'
import { CancelBtn } from './Button/Button'
import { BiDownArrow } from 'react-icons/bi'
import { AddNewCollectionForm } from './forms/AddNewCollectionForm'
import {cn} from './../lib/utils'

function NewCollectionUi() {
    const [open, setOpen] = useState(false)
  return (

		<div 
		className= {cn('w-full grid gap-2 uiWrap', 
			open ? 'h-auto' : 'h-[36px]'
		)}
		>
			<CancelBtn className='text-slate-200'
				onClick={()=> setOpen(!open)}>
						{open ? 'Fold' :'Add new collection'}
						{open
								?  <BiDownArrow  className='r180' />
								: <BiDownArrow className=''/>
								}
			</CancelBtn>
			<div className={open ? 'opened' : 'folded'}>
					{open && <h2 className='text-slate-300 text-center font-semibold'>
							Add collection</h2>
					}
					{open &&(
						<AddNewCollectionForm />
									)}
			</div>
		</div>
  )
}

export default NewCollectionUi