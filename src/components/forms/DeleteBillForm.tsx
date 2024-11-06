import React from 'react'
interface DeleteBillFormProps {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const DeleteBillForm: React.FC<DeleteBillFormProps> = ({ 
    id, 
    name,
    setIsSubmitting,
    setOpen
   }) => {
  return (
    <div>DeleteBillForm</div>
  )
}

export default DeleteBillForm