import CollectionList from '@/components/CollectionList';
import NewCollectionUi from '@/components/NewCollectionUi';


function DashboardPage() {

  return (
    <div className='w-full grid gap-2'>
        <NewCollectionUi/>
        <CollectionList/>
    </div>
  )
}

export default DashboardPage