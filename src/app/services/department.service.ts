import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DepartmentDto } from './../models/department';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 // private apiServerUrl = environment.apiBaseUrl;

 public apiServerUrl = "http://localhost:8081/website/v1";

// public apiServerUrl = "https://medic-admin.herokuapp.com/website/v1";

    id;
    currentUser: any = {};


    constructor(private http: HttpClient
    ) {
    }


    /**************************** DepartmentDto ******************/
    public getDepartmentDtos(): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/all`);
    }

    public getDepartmentDtosOrderDesc(): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/allServicesOrderDesc`);
    }

    public getDepartmentDtoById(demId: number): Observable<DepartmentDto> {
      return this.http.get<DepartmentDto>(`${this.apiServerUrl}/services/findById/${demId}`);
    }

    public addDepartmentDto(DepartmentDto: DepartmentDto): Observable<DepartmentDto> {
      return this.http.post<DepartmentDto>(`${this.apiServerUrl}/services/create`, DepartmentDto);
    }


    public addDepartmentDtoWithUser(DepartmentDto: DepartmentDto, id: number): Observable<DepartmentDto> {
      return this.http.post<DepartmentDto>(`${this.apiServerUrl}/services/createAnnonceWithUser?id=`+id, DepartmentDto);
    }

    public updateDepartmentDto(demId: number, DepartmentDto: DepartmentDto): Observable<DepartmentDto> {
      return this.http.put<DepartmentDto>(`${this.apiServerUrl}/services/update/${demId}`, DepartmentDto);
    }

    public deleteDepartmentDto(demId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/services/delete/${demId}`);
    }

    public getListDepartmentDtoBySelectedIsTrue(): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/searchAnnonceBySelectedIsTrue`);
    }

    public getListDepartmentDtoByKeyword(reference: string): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/searchAnnonceByKeyword?reference=`+reference);
    }

    public getListDepartmentDtoByLibeele(libelle: string): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/searchAnnonceByLibelle?libelle=`+libelle);
    }

    public get5LatestDepartmentDtoByOrderByIdDesc(): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/search5LatestAnnonceByIdDesc`);
    }

    public getDepartmentDtoByStatusEncours(): Observable<DepartmentDto[]> {
      return this.http.get<DepartmentDto[]>(`${this.apiServerUrl}/services/searchAnnonceByStatusEncours`);
    }


    public countNumberOfservices(): Observable<any>  {
      return this.http.get(`${this.apiServerUrl}/services/NumbersOfservices`);
    }

    public countNumberOfAnnonceByStatusPending(): Observable<any>  {
      return this.http.get(`${this.apiServerUrl}/services/NumbersOfAnnonceByStatusPending`);
    }

}
