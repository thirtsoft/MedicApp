import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DemandeDto } from './../models/demande';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

//  public apiServerUrl = "http://localhost:8081/website/v1";

  public apiServerUrl = "https://medic-admin.herokuapp.com/website/v1";

  //  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id;
  currentUser: any = {};


  constructor(private http: HttpClient
  ) {
  }


  getNumberOfDemandeInDay(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberOfDemandeInDay`);
  }

  getNumberOfDemandeInMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberOfDemandeInMonth`);
  }

  getNumberOfDemandeByStatusPending(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberOfDemandeByStatusPending`);
  }

  getNumberOfDemandeByStatusRefused(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberOfDemandeByStatusRefused`);
  }

  getNumberOfDemandeByStatusValidated(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberOfDemandeByStatusValidated`);
  }

  getNumbertotalOfDemandes(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/countNumberTotalOfDemande`);
  }

  getNumbertotalOfServices(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/services/countNumberTotalOfServices`);
  }

  getNumbertotalOfDemandeByMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/numberTotalOfDemandeByMonth`);
  }

  getNumbertotalOfDemandeByYear(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/demandes/numberTotalOfDemandeByYear`);
  }



}
