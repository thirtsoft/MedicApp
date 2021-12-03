import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UtilisateurDto } from './../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

//  private apiServerUrl = environment.apiBaseUrl;

  public apiServerUrl = "http://localhost:8081/website/v1";

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id;
  currentUser: any = {};


  constructor(private http: HttpClient
  ) {
  }


  /**************************** UtilisateurDto ******************/
  public getUtilisateurDtos(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/all`);
  }

  public getUtilisateurDtosOrderDesc(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/allUtilisateursOrderDesc`);
  }

  public getUtilisateurDtoById(demId: number): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/findById/${demId}`);
  }

  public addUtilisateurDto(UtilisateurDto: UtilisateurDto): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/create`, UtilisateurDto);
  }


  public addUtilisateurDtoWithUser(UtilisateurDto: UtilisateurDto, id: number): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/createAnnonceWithUser?id=`+id, UtilisateurDto);
  }

  public updateUtilisateurDto(demId: number, UtilisateurDto: UtilisateurDto): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/update/${demId}`, UtilisateurDto);
  }

  public deleteUtilisateurDto(demId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/utilisateurs/delete/${demId}`);
  }

  public getListUtilisateurDtoBySelectedIsTrue(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceBySelectedIsTrue`);
  }

  public getListUtilisateurDtoByKeyword(reference: string): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByKeyword?reference=`+reference);
  }

  public getListUtilisateurDtoByLibeele(libelle: string): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByLibelle?libelle=`+libelle);
  }

  public get5LatestUtilisateurDtoByOrderByIdDesc(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/search5LatestAnnonceByIdDesc`);
  }

  public getUtilisateurDtoByStatusEncours(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByStatusEncours`);
  }


  public countNumberOfutilisateurs(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfutilisateurs`);
  }

  public countNumberOfAnnonceByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfAnnonceByStatusPending`);
  }

}

