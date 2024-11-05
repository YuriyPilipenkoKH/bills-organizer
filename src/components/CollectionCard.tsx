'use client'
import { useState } from 'react';
import './../components/styles/mcard/mcard.css';
import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
// import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate, FlatBackBtn } from './Button/Button';
import MainModal from './modals/MainModal';
import { AddBillProps, DeletingCollectionConfirmProps } from '@/data/modalProps';
import { Divider } from 'antd';
import { McardHeader } from './styles/mcard/Mcard.styled';
import { AiFillCaretDown } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

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
							<Divider/>
							<tbody className='mcard-tablebody'>
							{bills.map((bill, idx) => (
								<tr key={idx}>
									<td className='w-1/8 '>
										{bill.month}
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
										<FlatBackBtn>
										<FiEdit />
										</FlatBackBtn>
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
			</>
        )}
		</>
  )
}

export default CollectionCard