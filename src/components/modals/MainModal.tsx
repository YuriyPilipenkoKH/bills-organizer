'use client'
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/mainModal/mainModal.css'
import { BtnDelete, BtnUpdate, CancelBtn} from '../Button/Button';
import { ModalBaseTypes } from '@/types/modalTypes';
import capitalize from '@/lib/capitalize';
import { cn } from '@/lib/utils';
import { RiDeleteBin2Line } from 'react-icons/ri';
import DeleteCollectionForm from '../forms/DeleteCollectionForm';
import { SiOneplus } from 'react-icons/si';

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
        dimentions
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
    // Adjust modal width based on screen size
    useEffect(() => {
      const modalContent = document.querySelector('.MainModal > div > .ant-modal-content') as HTMLElement;
      if (open) {
        if (modalContent ) {  // && window.innerWidth <= 400
          // modalContent.style.width = dimentions[0];
          // modalContent.style.height = dimentions[1];
          modalContent.setAttribute('found','true')  // random attribute
        } 
        // else {
        //   modalContent.style.width = dimentions[2];
        //   modalContent.style.height = dimentions[3];
        // }
        }
    }, [open, dimentions]);

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
  {(modalName === 'AddBill' 
      || modalName === 'DeletingProductConfirm')
      && (
      <BtnUpdate
        className='addOne'
        type="button" 
        onClick={showModal}>
          <SiOneplus />
      </BtnUpdate>
    )}
    <Modal
      className={cn('MainModal relative',
        (modalName === 'DeletingCollectionConfirm')  && `DeletingCollectionConfirm`,
        (modalName === 'AddBill')  && `AddBill`,
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
        {(modalName === 'DeletingCollectionConfirm') && (
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

