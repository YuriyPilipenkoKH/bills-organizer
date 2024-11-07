export interface ModalBaseTypes {
    modalName: string;
    dimentions: string[];
    title: string;
    text: string;
  }

  export interface DeletingBillTypes extends ModalBaseTypes {
    month: number
  }