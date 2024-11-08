'use client'
import { deleteCollection } from '@/actions/del-collection';
import React from 'react';
import { ModalDelBtn } from '../Button/Button';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { FormBaseTypes } from '@/types/formTypes';
import { cn } from '@/lib/utils';

interface DeleteCollectionFormProps extends FormBaseTypes{
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const DeleteCollectionForm: React.FC<DeleteCollectionFormProps> = ({ 
  id, 
  name,
  setIsSubmitting,
  setOpen,
  formName,
  dimentions
 }) => {
  console.log('formName',name)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true)
    const formData = new FormData();
    formData.append('id', id);
   
    try {
        const result = await deleteCollection(formData);
        if (result.success) {
            toast.success(`Collection ${capitalize(name)} deleted successfully!`);
            await wait(1000)
            setOpen(false)
        } else {
            toast.error(`Failed to delete ${capitalize(name)} Collection: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
      }
      finally{
        setIsSubmitting(false)
      }
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        hidden
        name='id'
        defaultValue={id}
      />
      <ModalDelBtn
      className={cn('',
        
      )}
       type='submit' >
        Delete 
      </ModalDelBtn>
    </form>
  );
};

export default DeleteCollectionForm;
