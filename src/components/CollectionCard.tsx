import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdCallMissedOutgoing } from "react-icons/md";
import { BtnUpdate, FlatBtn } from './Button/Button';
import MainModal from './modals/MainModal';
import { DeletingCollectionConfirmProps } from '@/data/modalProps';

interface CollectionCardProps {
    collection: Collection & {
        bills: Bill[]
    }
}

function CollectionCard({collection} :CollectionCardProps) {
  return (
    <div className='card flex gap-2 items-center bg-cyan-700 border-slate-200 rounded-lg p-2 text-slate-400 '>
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
				<BtnUpdate >
					<MdCallMissedOutgoing /> 
				</BtnUpdate>
			</div>
    </div>
  )
}

export default CollectionCard