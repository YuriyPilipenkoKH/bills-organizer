import { deleteBill } from '@/actions/del-bill';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import React from 'react'
import toast from 'react-hot-toast';
import { FlatBackBtn } from '../Button/Button';
import { FiEdit } from 'react-icons/fi';

interface DeleteBillFormProps {
  collectionId: string;
  billId: string;
  month:number;
  // setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const DeleteBillForm: React.FC<DeleteBillFormProps> = ({ 
    collectionId, 
    billId,
    month,
    // setIsSubmitting,
    setIsOpen
   }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // setIsSubmitting(true)
      const formData = new FormData();
      formData.append('collectionId', collectionId);
      formData.append('billId', billId);

      try {
        const result = await deleteBill(formData);
        if (result.success) {
            toast.success(`Bill ${capitalize(billId)} deleted successfully!`);
            await wait(1000)
            setIsOpen(false)
        } else {
            toast.error(`Failed to delete ${capitalize(billId)} Bill: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
      }
      // finally{
      //   setIsSubmitting(false)
      // }

    }
  return (
    <form onSubmit={handleSubmit}>
    <input
      hidden
      name='collectionId'
      defaultValue={collectionId}
    />
    <input
      hidden
      name='billId'
      defaultValue={billId}
    />
   
      <FlatBackBtn  type='submit' >
      {month}
      </FlatBackBtn>
  </form>
  )
}

export default DeleteBillForm