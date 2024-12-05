'use client'
import { Modal } from 'antd';
import React, {  useState } from 'react';
import '../styles/mainModal/mainModal.css'
import { BtnDelete, BtnUpdate, CancelBtn,  FlatBtn} from '../Button/Button';
import {  ModalBaseTypes } from '@/types/modalTypes';
import capitalize from '@/lib/capitalize';
import { cn } from '@/lib/utils';
import { RiDeleteBin2Line } from 'react-icons/ri';
import DeleteCollectionForm from '../forms/DeleteCollectionForm';
import { SiOneplus } from 'react-icons/si';
import AddBillForm from '../forms/AddBillForm';
import { AddBillFormProps, DeleteBillFormProps, DeleteCollectionFormProps, EditBillFormProps } from '@/data/formProps';
import DeleteBillForm from '../forms/DeleteBillForm';
import { TbTrashX } from "react-icons/tb";
import { FiEdit } from 'react-icons/fi';
import EditBillForm from '../forms/EditBillForm';
import { Bill } from '@prisma/client';

interface MainModalProps {
  modalTypes: ModalBaseTypes;
  bill?: Bill;
  id: string;
  name: string;
}

const MainModal: React.FC<MainModalProps> = ({ 
  modalTypes,
  id ,
  name, 
  bill
}) => {
    const { modalName, text, title } = modalTypes;
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false); // State to track hover

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
  {(modalName === 'AddBill' )  && (
      <BtnUpdate
        className='addOne'
        type="button" 
        onClick={showModal}>
          <SiOneplus className='ml-[2px] mb-[2px]' />
      </BtnUpdate>
    )}
  {modalName === 'DeletingBillConfirm' && bill && (
      <FlatBtn
        type="button"
        onClick={showModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
           {hovered ? <TbTrashX /> : bill?.month}
      </FlatBtn>
    )}
    {(modalName === 'EditBill')  && bill && (
      <FlatBtn
        className='EditBill'
        type="button" 
        onClick={showModal}>
          <FiEdit className='ml-[2px] mb-[2px]' />
      </FlatBtn>
    )}
    <Modal
      className={cn('MainModal relative',
        (modalName === 'DeletingCollectionConfirm')  && `DeletingCollectionConfirm`,
        (modalName === 'AddBill')  && `AddBill`,
        (modalName === 'DeletingBillConfirm')  && `DeletingBillConfirm`,
        (modalName === 'EditBill')  && `EditBill`,
        )}
      open={open}
      title={( isSubmitting ) 
        ? (modalName === 'AddBill') || (modalName === 'UpdateImgUrl')
          ? "Prosessing.." 
          : "moving to trash.." 
        :(modalName === 'DeletingBillConfirm')
          ?  `${title}  ${bill?.month} month from ${capitalize(name)} collection `
          : (modalName === 'EditBill') 
            ? `${title}  ${bill?.month} month from ${capitalize(name)} collection `
            :`${title} ${capitalize(name)} ?`
      }

      onOk={handleOk}
      onCancel={handleCancel}
      footer={[ 
          
      <CancelBtn
          key="back" 
          className={cn('cancel_btn w-[70px] rounded-md ',
            (modalName === 'AddBill')  && `AddBill-cancel-btn`,
            (modalName === 'EditBill')  && `EditBill-cancel-btn`,
          )}
          disabled={ isSubmitting }
          onClick={handleCancel}>
      Cancel
      </CancelBtn>
         ]}
        >
        <p>
        {( isSubmitting ) 
        ? (modalName === 'AddBill') || (modalName === 'UpdateImgUrl')
          ? "writing to MongoDB.." 
          : (modalName === 'EditBill') 
            ? "updating data.." 
            : "too late.." 
        : text 
        }
        </p>

        <div className=' w-full modalFormWrapper'>
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
        {modalName === 'DeletingBillConfirm' && bill && (
          
          <DeleteBillForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            billId={bill?.id}
            month={bill?.month}
            formName={DeleteBillFormProps.formName}
            dimentions={DeleteBillFormProps.dimentions}
            />
        )}
        {modalName === 'EditBill' && bill && (
          <EditBillForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            bill={ bill }
            formName={EditBillFormProps.formName}
            dimentions={EditBillFormProps.dimentions}
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