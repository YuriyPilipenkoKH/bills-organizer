

import CollectionList from '@/components/Collection/CollectionList';
import NewCollectionUi from '@/components/Collection/NewCollectionUi';
// import { redirect } from "next/navigation";

// import UserContext, { UserContextType } from '@/context/UserContext';
// import { useContext } from 'react';

export default  function DashboardPage() {
  // const session = await getServerSession(authOptions);
  // const { user }  = useContext(UserContext as React.Context<UserContextType>)
 
  // if (!user) {
  //   redirect("/");
  // }

  return (
    <div className='w-full grid gap-2'>
      <NewCollectionUi />
      <CollectionList />
    </div>
  );
}
