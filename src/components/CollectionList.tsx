import React from 'react'
import prisma from '../../prisma'

async function CollectionList() {
    const collections= await prisma.collection.findMany({
        include: {
          bills: true, // Include related products
        },
      })
  return (
    <div>
        {collections.length > 0 ? (
        <div>
            {collections.map((collection,idx:number)=> (
                <div key={idx}>
                    {collection.name}
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