import {  ModalBaseTypes } from '@/types/modalTypes';

export const DeletingCollectionConfirmProps: ModalBaseTypes = {
  modalName: 'DeletingCollectionConfirm',
  dimentions: ['300px', '200px','420px','250px'],
  title: 'Are you sure deleting',
  text: 'There will be no return....',
};

export const AddBillProps: ModalBaseTypes = {
  modalName: 'AddBill',
  dimentions: ['300px', '380px','420px','450px'],
  title: 'Add New Bill to',
  text: 'You can add 12 bills to current collection',
};

export const DeletingBillConfirmProps: ModalBaseTypes = {
  modalName: 'DeletingBillConfirm',
  dimentions: ['320px', '200px'],
  title: 'Are you sure deleting ',
  text: 'There will be no return....',

};

export const EditBillProps: ModalBaseTypes = {
  modalName: 'EditBill',
  dimentions:  ['300px', '380px','420px','450px'],
  title: 'Updating ',
  text: 'You can edit anything',
};

// ===========template====================
export const UpdateImgUrlProps: ModalBaseTypes = {
  modalName: 'UpdateImgUrl',
  dimentions: ['320px', '300px'],
  title: 'Update picture',
  text: 'You can add any picture',
};

export const ShowCategoryDetailsProps: ModalBaseTypes = {
  modalName: 'ShowCategoryDetails',
  dimentions: ['320px', '300px'],
  title: 'Details',
  text: 'You can edit any field?',
};