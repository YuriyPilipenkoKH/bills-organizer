'use client'
import { useState } from 'react';
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate } from './Button/Button';
import MainModal from './modals/MainModal';
import { DeletingCollectionConfirmProps } from '@/data/modalProps';

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
			<div className='bg-slate-300'>
				{bills && bills.length > 0 ? (
					<div >
						{bills.map((bill, idx) => (
							<div key={idx}>
								<p>mounth{bill.mounth}</p>
								<p>accrued{bill.accrued}</p>
								<p>claimed{bill.claimed}</p>
								<p>real{bill.real}</p>
							</div>
						))}
					</div>
				) : (
					<div>no bills added</div>
				)
						}
			</div>
        )}
		</>
  )
}

export default CollectionCard