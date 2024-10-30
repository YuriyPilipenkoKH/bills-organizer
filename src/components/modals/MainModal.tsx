'use client'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { BtnDelete, CancelBtn} from '../Button/Button';
import { ModalBaseTypes } from '@/types/modalTypes';
import capitalize from '@/lib/capitalize';
import { cn } from '@/lib/utils';
import { RiDeleteBin2Line } from 'react-icons/ri';
import DeleteCollectionForm from '../forms/DeleteCollectionForm';

interface MainModalProps {
    modalTypes: ModalBaseTypes
    id: string
    name: string
}

const MainModal: React.FC<MainModalProps> = ({ modalTypes, id ,name}) => {
    const {
        modalName, 
        text, 
        title,
    } = modalTypes
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setCanceling(true)
        setOpen(false);
    };

  return (
    <>
    {(modalName === 'DeletingCollectionConfirm' 
    || modalName === 'DeletingProductConfirm')
    && (
    <BtnDelete
        type="button" 
        onClick={showModal}>
         <RiDeleteBin2Line />
    </BtnDelete>
    )}



    <Modal
      className={cn('MainModal relative',
        (modalName === 'DeletingCollectionConfirm')  && `DeletingCollectionConfirm`,
        (modalName === 'DeletingProductConfirm')  && `delProductConfirm`,
        (modalName === 'EditProduct')  && `editProduct`,
        (modalName === 'UpdateImgUrl')  && `updateImgUrl`,
        )}
      open={open}
      title={( isSubmitting ) 
        ? (modalName === 'EditProduct') || (modalName === 'UpdateImgUrl')
          ? "updating.." 
          : "moving to trash.." 
        : `${title} ${capitalize(name)} ?`
      }

      onOk={handleOk}
      onCancel={handleCancel}
      footer={[ 
          
      <CancelBtn
          key="back" 
          className='cancel_btn w-[70px] rounded-md '
          disabled={ isSubmitting }
          onClick={handleCancel}>
      Cancel
      </CancelBtn>
         ]}
        >
        <p>
        {( isSubmitting ) 
        ? (modalName === 'EditProduct') || (modalName === 'UpdateImgUrl')
          ? "writing to database.." 
          : "too late.." 
        : text 
        }
        </p>

        <div className='absolute bottom-[20px]'>
        {(modalName === 'DeletingCategoryConfirm') && (
          <DeleteCollectionForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            />
        )}

        </div>
    </Modal>
    </>
  )
}

export default MainModal

