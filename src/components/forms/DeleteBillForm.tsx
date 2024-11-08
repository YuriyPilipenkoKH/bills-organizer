import { deleteBill } from '@/actions/del-bill';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import React from 'react'
import toast from 'react-hot-toast';
import { ModalDelBtn } from '../Button/Button';
import { FormBaseTypes } from '@/types/formTypes';

interface DeleteBillFormProps extends FormBaseTypes {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  billId:string
  month:number
  }

  const DeleteBillForm: React.FC<DeleteBillFormProps> = ({ 
    id: collectionId,
    billId,
    name,
    setIsSubmitting,
    setOpen,
    formName,
    dimentions,
    month
   }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true)
      const formData = new FormData();
      formData.append('collectionId', collectionId);
      formData.append('billId', billId);

    try {
      const result = await deleteBill(formData);
      if (result.success) {
          toast.success(`Bill ${capitalize(billId)} deleted successfully!`);
          await wait(1000)
          setOpen(false)
      } else {
          toast.error(`Failed to delete ${capitalize(billId)} Bill: ${result.error}`);
      }
      } 
      catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
      }
      finally{
        setIsSubmitting(false)
      }

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
   
      <ModalDelBtn  type='submit' >
      Delete {month} momth
      </ModalDelBtn>
  </form>
  )
}

export default DeleteBillForm