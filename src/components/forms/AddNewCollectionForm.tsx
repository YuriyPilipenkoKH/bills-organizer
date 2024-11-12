'use client'
import React, { useContext, useState } from 'react'
import {  CancelBtn,  FlatBtn } from '../Button/Button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize'
import { addCollection } from '@/actions/add-collection';
import { AuthError, Form_Universal, FormInput, FormLabel } from './FormStyles.styled';
import { addNewCollectionSchema, addNewCollectionSchemaType,  } from '@/models/addCollection';
import { CgCloseO } from "react-icons/cg";
import { FormBaseTypes } from '@/types/formTypes';
import UserContext, { UserContextType } from '@/context/UserContext';


export const AddNewCollectionForm: React.FC<FormBaseTypes> = ( {
	dimentions
} ) => {
	const {user} = useContext(UserContext as React.Context<UserContextType>)
		const [logError, setLogError] = useState<string>('')
	console.log('user',user)
		const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addNewCollectionSchemaType>({
			defaultValues: {
				name: '',
				year: ''
			},
				mode:'all',
				resolver: zodResolver(addNewCollectionSchema),
		})
		const {
			errors,
			isDirty,
			isValid ,
			isSubmitting,
		} = formState

		const onSubmit = async (data: addNewCollectionSchemaType) => {
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('year', String(data.year)); // Convert `year` to a string

			try {
					const result = await addCollection(formData);
					if (result.success) {
							toast.success(`Collection ${capitalize(data.name)} ${data.year} added successfully`!);
							reset();
					} else {
							toast.error(`Failed to add ${capitalize(data.name)} Collection : ${result.error}`);
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

  const onInvalid = () => {
    setLogError('Please fill in all required fields');
  };

  return (

	<Form_Universal
		onSubmit={handleSubmit(onSubmit, onInvalid)}
		className='flex flex-col gap-3 items-center'
		formHeight={dimentions[1]}
		autoComplete="off"
		noValidate>
			<FormLabel>
				<FormInput 
				{...register('name', { onChange: handleInputChange })}
					placeholder=	{( isSubmitting ) 
					? "Processing" 
					: 'name'}
				/>
			</FormLabel>
			<FormLabel>
				<FormInput
					{...register('year', { onChange: handleInputChange })}
					placeholder={isSubmitting ? 'Processing' : 'year'}
					type="text" // Ensures the input is treated as a string
				/>
			</FormLabel>
			<CancelBtn 
				className='mt-auto '
				type='submit'
				disabled={isSubmitting || !isDirty || !isValid}
						>
				Add
			</CancelBtn>
			<div className='absolute bottom-[46px] sm:w-[300px]  md:w-[350px]'>
			{( errors?.name || errors?.year ) && (
				<AuthError className="autherror w-full">
					{errors.name && <div>{errors.name.message}</div>}
					{!errors.name && errors.year && <div>{errors.year.message}</div>}
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

