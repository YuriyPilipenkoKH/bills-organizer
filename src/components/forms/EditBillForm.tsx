import { FormBaseTypes } from '@/types/formTypes';
import React from 'react'

interface EditBillFormProps extends FormBaseTypes {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const EditBillForm: React.FC<EditBillFormProps> = ({ 
    id, 
    name,
    setIsSubmitting,
    setOpen,
    formName,
    dimentions
    }) => {
  return (
    <div>EditBillForm</div>
  )
}

export default EditBillForm