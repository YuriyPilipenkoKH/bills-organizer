import { Bill, Collection } from '@prisma/client'
import capitalize from '@/lib/capitalize'

interface CollectionCardProps {
    collection: Collection & {
        bills: Bill[]
    }
}

function CollectionCard({collection} :CollectionCardProps) {
  return (
    <div className='card '>
        {capitalize(collection?.name)}
    </div>
  )
}

export default CollectionCard