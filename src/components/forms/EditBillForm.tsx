import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { editBillSchema, editBillSchemaType } from '@/models/editBillSchema';
import { FormBaseTypes } from '@/types/formTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
    dimentions,
    }) => {
      const [logError, setLogError] = useState<string>('')

      const {
        register, 
        handleSubmit,
        formState,
        reset,
      } = useForm<editBillSchemaType>({
        defaultValues: {
          claimed: undefined,
          real: undefined,
          },
          mode:'all',
          resolver: zodResolver(editBillSchema),
      })
      const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
      } = formState
      const onSubmit = async (data: editBillSchemaType) => {
        setIsSubmitting(true)
        const formData = new FormData();
        
        formData.append('claimed', String(data.claimed)); // Convert to string
        formData.append('real', String(data.real)); 
        // formData.append('month', String(data.month)); 
        formData.append('accrued', String(0)); 
        formData.append('collectionId', id); 
  
        try {
            const result = await addBill(formData);
            if (result.success) {
                toast.success(`Bill for ${capitalize(String(data.month))} month added successfully`!);
                reset();
                await wait(1000)
                setOpen(false)
            } else {
                toast.error(`Failed to add Bill for ${capitalize(String(data.month))} month  ${result.error}`);
            }
          } catch 
          (error) {
            reset();
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(`An error occurred: ${errorMessage}`);
            setLogError(errorMessage)
        }
        finally{
          setIsSubmitting(false)
        }
    };
    const handleInputChange = () => {
      if (logError) {
        setLogError('');
      }
    };
  return (
    <div>EditBillForm</div>
  )
}

export default EditBillForm