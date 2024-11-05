'use client'
import { addBill } from '@/actions/add-bill';
import capitalize from '@/lib/capitalize';
import { addBillSchema, addBillSchemaType } from '@/models/addBill';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthError, Form_Universal, FormInput, FormLabel } from './FormStyles.styled';
import { CancelBtn, FlatBtn } from '../Button/Button';
import { CgCloseO } from 'react-icons/cg';
import { FormBaseTypes } from '@/types/formTypes';
interface AddBillFormProps extends FormBaseTypes {
    id: string;
    name: string
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }

const AddBillForm: React.FC<AddBillFormProps> = ({ 
    id, 
    name,
    setIsSubmitting,
    setOpen,
    formName,
    dimentions
    }) => {
      const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addBillSchemaType>({
			defaultValues: {
				claimed: undefined,
        real: undefined,
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
      // console.log(data)
			
			formData.append('claimed', String(data.claimed)); // Convert to string
			formData.append('real', String(data.real)); 
			formData.append('month', String(data.month)); 
			formData.append('accrued', String(18)); 
			formData.append('collectionId', id); 

			try {
					const result = await addBill(formData);
					if (result.success) {
							toast.success(`Bill for ${capitalize(String(data.month))} month added successfully`!);
							reset();
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
	};
  const handleInputChange = () => {
    if (logError) {
      setLogError('');
    }
  };
  return (
  <Form_Universal
  onSubmit={handleSubmit(onSubmit)}
  className='flex flex-col gap-3 items-center'
  formHeight={dimentions[1]}
  autoComplete="off"
  noValidate>
    <FormLabel>
      <FormInput
        {...register('month', { onChange: handleInputChange })}
        placeholder={isSubmitting 
          ? 'Processing' : 'month'}
        type="number" // Ensures the input is treated as a string
      />
    </FormLabel>
    <FormLabel>
      <FormInput 
        {...register('claimed', { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )
          ? "Processing" : 'claimed'}
          type="number" 
      />
    </FormLabel>
    <FormLabel>
      <FormInput
        {...register('real', { onChange: handleInputChange })}
        placeholder={isSubmitting 
          ? 'Processing' : 'real'}
          type="number" 
      />
    </FormLabel>
    <CancelBtn 
      className='mt-auto '
      type='submit'
      disabled={isSubmitting || !isDirty || !isValid}
            >
        Add
    </CancelBtn>
		<div className='absolute bottom-[46px] sm:w-[300px]  md:w-[500px]'>
		{( errors?.month || errors?.claimed || errors?.real ) && (
			<AuthError className="autherror w-full">
				{errors.month && <div>{errors.month.message}</div>}
				{!errors.month && errors.claimed && <div>{errors.claimed.message}</div>}
				{!errors.month && !errors.claimed && errors.real && <div>{errors.real.message}</div>}
				{logError && <div>{logError}</div>}
				<FlatBtn 
					onClick={()=>reset()}>
						<CgCloseO size={30} />
				</FlatBtn>
			</AuthError>
			)}
		</div>		
  </Form_Universal>
  )
}

export default AddBillForm