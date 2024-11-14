
import React from 'react'
import prisma from '../../../prisma'
import CollectionCard from './CollectionCard'

async function CollectionList() {
    const collections= await prisma.collection.findMany({
        include: {
        //   bills: true, // Include related products
        },
      })
  return (
    <div>
			{collections.length > 0 ? (
			<div className='grid gap-2'>
				{collections.map((collection,idx:number)=> (
					<div key={idx}>
						<CollectionCard collection={collection}/>
					</div>
				))}
        </div>
    ) : (
			<div className='text-center'>
				Add collection today
			</div>
    )}
    </div>
  )
}

export default CollectionList