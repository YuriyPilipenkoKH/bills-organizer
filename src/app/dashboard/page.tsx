import CollectionList from '@/components/Collection/CollectionList';
import NewCollectionUi from '@/components/Collection/NewCollectionUi';


function DashboardPage() {

  return (
    <div className='w-full grid gap-2'>
        <NewCollectionUi/>
        <CollectionList/>
    </div>
  )
}

export default DashboardPage