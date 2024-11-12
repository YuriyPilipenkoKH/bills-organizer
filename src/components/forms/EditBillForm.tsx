import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { editBillSchema, editBillSchemaType } from '@/models/editBillSchema';
import { FormBaseTypes } from '@/types/formTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthError, Form_Universal, FormInput, FormLabel } from './FormStyles.styled';
import { CancelBtn, FlatBtn } from '../Button/Button';
import { cn } from '@/lib/utils';
import { CgCloseO } from 'react-icons/cg';
import { editBill } from '@/actions/edit-bill';

interface EditBillFormProps extends FormBaseTypes {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  billId:string
  month:number
  }

  const EditBillForm: React.FC<EditBillFormProps> = ({ 
    id: collectionId,
    billId,
    month,
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
        formData.append('month', String(month)); 
        formData.append('accrued', String(0)); 
        formData.append('collectionId', collectionId); 
        formData.append('billId', billId); 
  
        try {
            const result = await editBill(formData);
            if (result.success) {
                toast.success(`Bill for ${capitalize(String(month))} month added successfully`!);
                reset();
                await wait(1000)
                setOpen(false)
            } else {
                toast.error(`Failed to add Bill for ${capitalize(String(month))} month  ${result.error}`);
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
    <Form_Universal
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3 items-center'
    formHeight={dimentions[1]}
    autoComplete="off"
    noValidate>

      <FormLabel>
        <FormInput 
          {...register('claimed', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )
            ? "Processing" : 'claimed' }
            type="number" 
        />
      </FormLabel>
      <FormLabel>
        <FormInput
          {...register('real', { onChange: handleInputChange })}
          placeholder={isSubmitting 
            ? 'Processing' : 'real' }
            type="number" 
        />
      </FormLabel>
      <CancelBtn 
        className={cn('mt-auto ',
      (formName === 'AddBillForm')  && `AddBill-approve-btn`
        )}
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid}
              >
          Add
      </CancelBtn>
      <div className='absolute bottom-[56px] sm:w-[270px]  md:w-[350px]'>
      {(  errors?.claimed || errors?.real ) && (
        <AuthError className="autherror w-full">
          {errors.claimed && <div>{errors.claimed.message}</div>}
          {errors.claimed && errors.real && <div>{errors.real.message}</div>}
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

export default EditBillForm