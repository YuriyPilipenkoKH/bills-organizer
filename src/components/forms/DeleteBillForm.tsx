import React from 'react'

interface DeleteBillFormProps {
  collectionId: string;
  billId: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const DeleteBillForm: React.FC<DeleteBillFormProps> = ({ 
    collectionId, 
    billId,
    setIsSubmitting,
    setOpen
   }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true)
      const formData = new FormData();
      formData.append('collectionId', collectionId);
      formData.append('billId', billId);


    }
  return (
    <div>DeleteBillForm</div>
  )
}

export default DeleteBillForm