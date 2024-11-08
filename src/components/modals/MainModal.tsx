'use client'
import { Modal } from 'antd';
import React, {  useState } from 'react';
import '../styles/mainModal/mainModal.css'
import { BtnDelete, BtnUpdate, CancelBtn, FlatBackBtn, FlatBtn} from '../Button/Button';
import { DeletingBillTypes, ModalBaseTypes } from '@/types/modalTypes';
import capitalize from '@/lib/capitalize';
import { cn } from '@/lib/utils';
import { RiDeleteBin2Line } from 'react-icons/ri';
import DeleteCollectionForm from '../forms/DeleteCollectionForm';
import { SiOneplus } from 'react-icons/si';
import AddBillForm from '../forms/AddBillForm';
import { AddBillFormProps, DeleteBillFormProps, DeleteCollectionFormProps } from '@/data/formProps';
import DeleteBillForm from '../forms/DeleteBillForm';

interface MainModalProps {
    modalTypes: ModalBaseTypes
    modalExtraTypes?: DeletingBillTypes
    id: string
    name: string
}

const MainModal: React.FC<MainModalProps> = ({ modalTypes, id ,name, modalExtraTypes}) => {
    const {
        modalName, 
        text, 
        title,
    } = modalTypes
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

console.log(modalName)
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
  {(modalName === 'AddBill' 
      || modalName === 'DeletingProductConfirm')
      && (
      <BtnUpdate
        className='addOne'
        type="button" 
        onClick={showModal}>
          <SiOneplus className='ml-[2px] mb-[2px]' />
      </BtnUpdate>
    )}
 {modalName === 'DeletingBillConfirm' && modalExtraTypes && (
      <FlatBtn
        type="button" 
        onClick={showModal}>
          {modalExtraTypes?.month}
      </FlatBtn>
    )}
    <Modal
      className={cn('MainModal relative',
        (modalName === 'DeletingCollectionConfirm')  && `DeletingCollectionConfirm`,
        (modalName === 'AddBill')  && `AddBill`,
        (modalName === 'DeletingBillConfirm')  && `DeletingBillConfirm`,
        (modalName === 'UpdateImgUrl')  && `updateImgUrl`,
        )}
      open={open}
      title={( isSubmitting ) 
        ? (modalName === 'EditProduct') || (modalName === 'UpdateImgUrl')
          ? "updating.." 
          : "moving to trash.." 
        :(modalName === 'DeletingBillConfirm')
          ?  `${title}  ${modalExtraTypes?.month} month from ${capitalize(name)} collection `
          : `${title} ${capitalize(name)} ?`
      }

      onOk={handleOk}
      onCancel={handleCancel}
      footer={[ 
          
      <CancelBtn
          key="back" 
          className={cn('cancel_btn w-[70px] rounded-md ',
            (modalName === 'AddBill')  && `AddBill-cancel-btn`
          )}
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

        <div className=' w-full'>
        {(modalName === 'DeletingCollectionConfirm') && (
          <DeleteCollectionForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            formName={DeleteCollectionFormProps.formName}
            dimentions={DeleteCollectionFormProps.dimentions}
            />
        )}
        {(modalName === 'AddBill') && (
          <AddBillForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            formName={AddBillFormProps.formName}
            dimentions={AddBillFormProps.dimentions}
            />
        )}
        {modalName === 'DeletingBillConfirm' && modalExtraTypes && (
          
          <DeleteBillForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            billId={modalExtraTypes?.billId}
            month={modalExtraTypes?.month}
            formName={DeleteBillFormProps.formName}
            dimentions={DeleteBillFormProps.dimentions}
            />
        )}

        </div>
    </Modal>
    </>
  )
}

export default MainModal

    // // Adjust modal width based on screen size
    // useEffect(() => {
    //   const modalContent = document.querySelector('.MainModal > div > .ant-modal-content') as HTMLElement;
    //   if (open) {
    //     if (modalContent ) {  // && window.innerWidth <= 400
    //       // modalContent.style.width = dimentions[0];
    //       // modalContent.style.height = dimentions[1];
    //       modalContent.setAttribute('found','true')  // random attribute
    //     } 
    //     // else {
    //     //   modalContent.style.width = dimentions[2];
    //     //   modalContent.style.height = dimentions[3];
    //     // }
    //     }
    // }, [open, dimentions]);