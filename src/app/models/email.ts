import { DemandeDto } from './demande';
export class Email {
}

export class EmailDto {
  id: number;
  receiver: string;
  subject: string;
  message: string;

  createDate: Date;

//  demandeDto: DemandeDto;

}

