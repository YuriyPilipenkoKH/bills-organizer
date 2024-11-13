export interface ModalBaseTypes {
    modalName: string;
    dimentions: string[];
    title: string;
    text: string;

  }


  export interface EssintialBillTypes {
    bill: {
      id: string;
      month: number;
      claimed?: number;
      real?: number | null; // Allows null values, matching Prisma's Int? type
      accrued?: number;
    };
  }
  
    export interface DeletingBillTypes  {
      bill:{
        id :string
        month: number
        claimed?: number
        real?: number | null; // Allowing null as well
        accrued?: number
      }
  
    }