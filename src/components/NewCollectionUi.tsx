'use client'

import React, { useState } from 'react'
import { CancelBtn } from './Button/Button'
import { BiDownArrow } from 'react-icons/bi'
import { AddNewCollectionForm } from './forms/AddNewCollectionForm'
import {cn} from './../lib/utils'
import { AddNewCollectionFormProps } from '@/data/formProps'


function NewCollectionUi() {
    const [open, setOpen] = useState(false)
		const {formName, dimentions} = AddNewCollectionFormProps
  return (

		<>
		<CancelBtn className='CancelBtn text-slate-200'
			onClick={()=> setOpen(!open)}>
					{open ? 'Fold' :'Add new collection'}
					{open
						?  <BiDownArrow  className='r180' />
						: <BiDownArrow className=''/>
						}
			</CancelBtn>
			<div className={cn('w-full   uiWrap',
				open ? 'opened' : 'folded') }>
					{open && <h2 className='text-slate-300 text-center font-semibold'>
							Add collection</h2>
					}
					{open &&(
						<AddNewCollectionForm 
						formName ={formName}
						dimentions ={dimentions}
						/>
									)}
			</div>
		</>
  )
}

export default NewCollectionUi