export interface ModalBaseTypes {
    modalName: string;
    dimentions: string[];
    title: string;
    text: string;

  }

  export interface DeletingBillTypes  {
    billId :string
    month: number
    claimed?: number
    real?: number

  }