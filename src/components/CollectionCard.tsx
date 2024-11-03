'use client'
import { useState } from 'react';
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate } from './Button/Button';
import MainModal from './modals/MainModal';
import { DeletingCollectionConfirmProps } from '@/data/modalProps';
import { Divider } from 'antd';

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
			<div className='mcard-header flex gap-2 items-center bg-cyan-700  rounded-lg p-2 text-slate-400 '>
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
			<>
				<div className='mcard-content'>
					{bills && bills.length > 0 ? (
						<div >
							{bills.map((bill, idx) => (
								<div key={idx}>
									<span>mounth{bill.mounth}</span>
									<span>accrued{bill.accrued}</span>
									<span>claimed{bill.claimed}</span>
									<span>real{bill.real}</span>
								</div>
							))}
						</div>
					) : (
						<div>no bills added</div>
					)
							}
				</div>
				 <Divider/>
				<div className="mcard-footer">
							footer
				</div>
			</>
        )}
		</>
  )
}

export default CollectionCard