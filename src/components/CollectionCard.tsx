'use client'
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate, FlatBtn } from './Button/Button';
import MainModal from './modals/MainModal';
import { DeletingCollectionConfirmProps } from '@/data/modalProps';
import { useState } from 'react';

interface CollectionCardProps {
    collection: Collection & {
        bills: Bill[]
    }
}

function CollectionCard({collection} :CollectionCardProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { bills } = collection 

  return (
    <>
			<div className='Mcard flex gap-2 items-center bg-cyan-700  rounded-lg p-2 text-slate-400 '>
						<h2 className='text-xl  font-bold w-24'>
								{capitalize(collection?.name)}
						</h2>
						<span >
							{collection.year}
						</span>
						<div className='flex gap-2  ml-auto'>
							<MainModal 
									modalTypes={DeletingCollectionConfirmProps}
									id={collection.id}
									name={collection.name}
									/>
							<BtnUpdate onClick={()=> setIsOpen(!isOpen)}>
								<MdCallMissedOutgoing /> 
							</BtnUpdate>
						</div>
			</div>
			{isOpen && (
				<div>
					open
				</div>
			)}
		</>
  )
}

export default CollectionCard