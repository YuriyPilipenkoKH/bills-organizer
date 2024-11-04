import React from 'react'

interface AddBillFormProps {
    id: string;
    name: string
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }

    const AddBillForm: React.FC<AddBillFormProps> = ({ 
        id, 
        name,
        setIsSubmitting,
        setOpen
       }) => {
  return (
    <div>AddBillForm</div>
  )
}

export default AddBillForm