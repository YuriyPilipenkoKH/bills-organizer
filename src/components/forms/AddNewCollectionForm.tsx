'use client'

import React from 'react'
import {  CancelBtn,  FlatBtn } from '../Button/Button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize'
import { addCollection } from '@/actions/add-collection';
import { AuthError, Form_Universal, FormInput, FormLabel } from './FormStyles.styled';
import { addNewCollectionSchema, addNewCollectionSchemaType,  } from '@/models/addCollection';
import { CgCloseO } from "react-icons/cg";

export const AddNewCollectionForm: React.FC = () => {
		// const [logError, setLogError] = useState<string>('')
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
        } catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
			}
	};

  return (
		<>
		<h2 className='text-slate-200'>
			Add new collection
		</h2>
    <Form_Universal
		onSubmit={handleSubmit(onSubmit)}
		className='flex flex-col gap-3 items-center'
		autoComplete="off"
		noValidate>
			<FormLabel>
			<FormInput 
			 {...register('name')}
				 placeholder=	{( isSubmitting ) 
				? "Processing" 
				: 'name'}
			/>
			</FormLabel>
			<FormLabel>
			<FormInput
				{...register('year')}
				placeholder={isSubmitting ? 'Processing' : 'year'}
				type="text" // Ensures the input is treated as a string
			/>
			</FormLabel>
			<CancelBtn 
			className='mt-auto'
			type='submit'
			disabled={isSubmitting || !isDirty || !isValid}
						>
				Add
			</CancelBtn>
		<div className='absolute bottom-[46px] w-full px-2 md:w-[518px]'>
		{( errors?.name || errors?.year ) && (
			<AuthError className="autherror ">
				{errors.name && <div>{errors.name.message}</div>}
				{!errors.name && errors.year && <div>{errors.year.message}</div>}
				<FlatBtn>
					<CgCloseO size={30} />
				</FlatBtn>
			</AuthError>
			)}
		</div>		
    </Form_Universal>
		</>
  )
}

