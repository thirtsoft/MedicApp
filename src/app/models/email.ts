import { DemandeDto } from './demande';
export class Email {
}

export class EmailDto {
  id: number;
  customerName: string;
  customerEmail: string;
  recipient: string;
  subject: string;
  message: string;

  createDate: Date;

  demandeDto: DemandeDto;


}

