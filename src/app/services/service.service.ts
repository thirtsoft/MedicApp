import { ServiceDto } from './../models/department';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public apiServerUrl = "http://localhost:8081/website/v1";

//  public apiServerUrl = "https://medic-admin.herokuapp.com/website/v1";

  id;
  currentUser: any = {};


  constructor(private http: HttpClient
  ) {
  }


  /**************************** ServiceDto ******************/
  public getServiceDtos(): Observable<ServiceDto[]> {
    console.log("Before API Service");
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/all`);
  }

  public getServiceDtosOrderDesc(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/allServicesOrderDesc`);
  }

  public getServiceDtoById(demId: number): Observable<ServiceDto> {
    return this.http.get<ServiceDto>(`${this.apiServerUrl}/services/findById/${demId}`);
  }

  public addServiceDto(ServiceDto: ServiceDto): Observable<ServiceDto> {
    return this.http.post<ServiceDto>(`${this.apiServerUrl}/services/create`, ServiceDto);
  }


  public addServiceDtoWithUser(ServiceDto: ServiceDto, id: number): Observable<ServiceDto> {
    return this.http.post<ServiceDto>(`${this.apiServerUrl}/services/createAnnonceWithUser?id=`+id, ServiceDto);
  }

  public updateServiceDto(demId: number, ServiceDto: ServiceDto): Observable<ServiceDto> {
    return this.http.put<ServiceDto>(`${this.apiServerUrl}/services/update/${demId}`, ServiceDto);
  }

  public deleteServiceDto(demId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/services/delete/${demId}`);
  }

  public getListServiceDtoBySelectedIsTrue(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/searchAnnonceBySelectedIsTrue`);
  }

  public getListServiceDtoByKeyword(reference: string): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/searchAnnonceByKeyword?reference=`+reference);
  }

  public getListServiceDtoByLibeele(libelle: string): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/searchAnnonceByLibelle?libelle=`+libelle);
  }

  public get5LatestServiceDtoByOrderByIdDesc(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/search5LatestAnnonceByIdDesc`);
  }

  public getServiceDtoByStatusEncours(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiServerUrl}/services/searchAnnonceByStatusEncours`);
  }


  public countNumberOfservices(): Observable<any>  {
     return this.http.get(`${this.apiServerUrl}/services/NumbersOfservices`);
  }

  public countNumberOfAnnonceByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/services/NumbersOfAnnonceByStatusPending`);
  }

}
