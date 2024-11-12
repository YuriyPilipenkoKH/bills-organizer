'use client'
import { useState } from 'react';
import './../../components/styles/mcard/mcard.css';
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
// import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate,  FlatBtn } from '../Button/Button';
import MainModal from '../modals/MainModal';
import { AddBillProps, DeletingBillConfirmProps, DeletingCollectionConfirmProps } from '@/data/modalProps';
import { Divider } from 'antd';
import { McardHeader } from '../styles/mcard/Mcard.styled';
import { AiFillCaretDown } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Transition } from '@headlessui/react';

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

			<Transition
				show={isOpen}
				enter="transition-opacity duration-1400 ease-out"
				enterFrom="opacity-0 max-h-0 overflow-hidden"
				enterTo="opacity-100 max-h-screen overflow-visible"
				leave="transition-opacity duration-1400 ease-in"
				leaveFrom="opacity-100 max-h-screen overflow-visible"
				leaveTo="opacity-0 max-h-0 overflow-hidden"
      >
			<div>
				<div className='mcard-content'>
					{bills && bills.length > 0 ? (
						<table className='mcard-table w-full'	>
							<thead>
								<tr>
									<th className='w-1/8'></th>
									<th className='w-1/4'>claimed</th>
									<th className='w-1/4'>real</th>
									<th className='w-1/4'>accrued</th>
									<th className='w-1/8 '></th>
								</tr>
							</thead>
							<tbody className='mcard-tablebody'>
							{bills
							.slice() // Create a shallow copy to avoid mutating the original array
							.sort((a, b) => a.month - b.month) // Sort by `month` in ascending order
							.map((bill, idx) => (
								<tr key={idx} className='odd:bg-yellow-100  even:bg-teal-100'>
									<td className='w-1/8 '>
									<MainModal
										modalTypes={DeletingBillConfirmProps}
										modalExtraTypes={{
											billId:bill.id,
											month:bill.month
										}}
										id={collection.id}
										name={collection.name}
									/>
									</td>
									<td className='w-1/4 text-center'>
										{bill.claimed}
									</td>
									<td className='w-1/4  text-center'>
										{bill.real}
									</td>
									<td className='w-1/4  text-center'>
										{bill.accrued}
									</td>
									<td className='w-1/8  edit-wrapp'>
										{/* <FlatBtn >
											<FiEdit />
										</FlatBtn> */}
									</td>
								</tr>
							))}
							</tbody>
						</table>
					) : (
						<div>no bills available</div>
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
			</div>
			</Transition>
		</>
  )
}

export default CollectionCard