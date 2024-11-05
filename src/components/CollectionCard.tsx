'use client'
import { useState } from 'react';
import './../components/styles/mcard/mcard.css';
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
// import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate } from './Button/Button';
import MainModal from './modals/MainModal';
import { AddBillProps, DeletingCollectionConfirmProps } from '@/data/modalProps';
import { Divider } from 'antd';
import { McardHeader } from './styles/mcard/Mcard.styled';
import { AiFillCaretDown } from "react-icons/ai";


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
			<McardHeader
				isOpen={isOpen}
			 className='mcard-header  '>
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
				<AiFillCaretDown />
				</BtnUpdate>
			</div>
			</McardHeader>
			{isOpen && (
			<>
				<div className='mcard-content'>
					{bills && bills.length > 0 ? (
						<div >
							{bills.map((bill, idx) => (
								<div key={idx}>
									<span>month{bill.month}</span>
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
				<MainModal 
						modalTypes={AddBillProps}
						id={collection.id}
						name={collection.name}
						/>
				</div>
			</>
        )}
		</>
  )
}

export default CollectionCard