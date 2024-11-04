'use client'
import { addBill } from '@/actions/add-bill';
import capitalize from '@/lib/capitalize';
import { addBillSchema, addBillSchemaType } from '@/models/addBill';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
      const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addBillSchemaType>({
			defaultValues: {
				claimed: 0,
        real: 0,
        mounth:1
			},
				mode:'all',
				resolver: zodResolver(addBillSchema),
		})
		const {
			errors,
			isDirty,
			isValid ,
			isSubmitting,
		} = formState
		const onSubmit = async (data: addBillSchemaType) => {
			const formData = new FormData();
			
			formData.append('year', String(data.claimed)); // Convert to string
			formData.append('year', String(data.real)); 
			formData.append('year', String(data.mounth)); 

			try {
					const result = await addBill(formData);
					if (result.success) {
							toast.success(`Collection ${capitalize(name)} added successfully`!);
							reset();
					} else {
							toast.error(`Failed to add ${capitalize(name)} Collection : ${result.error}`);
					}
        } catch 
				(error) {
					reset();
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
					setLogError(errorMessage)
			}
	};
  return (
    <div>AddBillForm</div>
  )
}

export default AddBillForm