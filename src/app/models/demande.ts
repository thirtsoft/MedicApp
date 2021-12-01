import { StatusDemande } from "./statutsDemande";

export class Demande {
}

export class DemandeDto {
  id: number;
  numero: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  typeEtude: string;
  directorThese: string;
  speciality: string;
  masqueSaisi: string;
  saisiDonnees: string;
  analyseUnvaried: string;
  analyseBivarie: string;
  analyseMultivariate: string;
  subjectThese: string;
  baseDeDonnee: string;
  price: number;
  nbreJours: number;
  subject: string;
  status: string;
  message: string;

  createdDate: Date;


}

