import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmailDto } from './../models/email';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

//  public apiServerUrl = "http://localhost:8081/website/v1";


  public apiServerUrl = "https://medic-admin.herokuapp.com/website/v1";

  id;
  currentUser: any = {};


  constructor(private http: HttpClient
  ) {
  }


  /**************************** EmailDto ******************/
  public getEmailDtos(): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/all`);
  }

  public getEmailDtosOrderDesc(): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/allEmailsOrderDesc`);
  }

  public getEmailDtoById(demId: number): Observable<EmailDto> {
    return this.http.get<EmailDto>(`${this.apiServerUrl}/emails/findById/${demId}`);
  }

  public sendEmailToManager(emailDto: EmailDto): Observable<EmailDto> {
    return this.http.post<EmailDto>(`${this.apiServerUrl}/emails/sendEmailToManager`, emailDto);
  }

  public sendEmailToCustomer(emailDto: EmailDto): Observable<EmailDto> {
    return this.http.post<EmailDto>(`${this.apiServerUrl}/emails/sendEmailToCustomer`, emailDto);
  }


  public addEmailDtoWithUser(EmailDto: EmailDto, id: number): Observable<EmailDto> {
    return this.http.post<EmailDto>(`${this.apiServerUrl}/emails/sendEmailToCustomer?id=`+id, EmailDto);
  }

  public updateEmailDto(demId: number, EmailDto: EmailDto): Observable<EmailDto> {
    return this.http.put<EmailDto>(`${this.apiServerUrl}/emails/update/${demId}`, EmailDto);
  }

  public deleteEmailDto(demId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/emails/delete/${demId}`);
  }

  public getListEmailDtoBySelectedIsTrue(): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/searchAnnonceBySelectedIsTrue`);
  }

  public getListEmailDtoByKeyword(reference: string): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/searchAnnonceByKeyword?reference=`+reference);
  }

  public getListEmailDtoByLibeele(libelle: string): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/searchAnnonceByLibelle?libelle=`+libelle);
  }

  public get5LatestEmailDtoByOrderByIdDesc(): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/search5LatestAnnonceByIdDesc`);
  }

  public getEmailDtoByStatusEncours(): Observable<EmailDto[]> {
    return this.http.get<EmailDto[]>(`${this.apiServerUrl}/emails/searchAnnonceByStatusEncours`);
  }

  public countNumberOfemails(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/emails/NumbersOfemails`);
  }

  public countNumberOfAnnonceByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/emails/NumbersOfAnnonceByStatusPending`);
  }

}
