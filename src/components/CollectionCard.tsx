import capitalize from '@/lib/capitalize'
import { Bill, Collection } from '@prisma/client'
import React from 'react'

interface CollectionCardProps {
    collection: Collection & {
        bills: Bill[]
    }
}

function CollectionCard({collection} :CollectionCardProps) {
  return (
    <div className='  bg-lime-300'>
        {capitalize(collection?.name)}
    </div>
  )
}

export default CollectionCard