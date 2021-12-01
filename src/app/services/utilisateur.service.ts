import { UtilisateurGetDto } from './../models/utilisateur';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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


  /**************************** UtilisateurGetDto ******************/
  public getUtilisateurGetDtos(): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/all`);
  }

  public getUtilisateurGetDtosOrderDesc(): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/allUtilisateursOrderDesc`);
  }

  public getUtilisateurGetDtoById(demId: number): Observable<UtilisateurGetDto> {
    return this.http.get<UtilisateurGetDto>(`${this.apiServerUrl}/utilisateurs/findById/${demId}`);
  }

  public addUtilisateurGetDto(UtilisateurGetDto: UtilisateurGetDto): Observable<UtilisateurGetDto> {
    return this.http.post<UtilisateurGetDto>(`${this.apiServerUrl}/utilisateurs/create`, UtilisateurGetDto);
  }


  public addUtilisateurGetDtoWithUser(UtilisateurGetDto: UtilisateurGetDto, id: number): Observable<UtilisateurGetDto> {
    return this.http.post<UtilisateurGetDto>(`${this.apiServerUrl}/utilisateurs/createAnnonceWithUser?id=`+id, UtilisateurGetDto);
  }

  public updateUtilisateurGetDto(demId: number, UtilisateurGetDto: UtilisateurGetDto): Observable<UtilisateurGetDto> {
    return this.http.put<UtilisateurGetDto>(`${this.apiServerUrl}/utilisateurs/update/${demId}`, UtilisateurGetDto);
  }

  public deleteUtilisateurGetDto(demId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/utilisateurs/delete/${demId}`);
  }

  public getListUtilisateurGetDtoBySelectedIsTrue(): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceBySelectedIsTrue`);
  }

  public getListUtilisateurGetDtoByKeyword(reference: string): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByKeyword?reference=`+reference);
  }

  public getListUtilisateurGetDtoByLibeele(libelle: string): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByLibelle?libelle=`+libelle);
  }

  public get5LatestUtilisateurGetDtoByOrderByIdDesc(): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/search5LatestAnnonceByIdDesc`);
  }

  public getUtilisateurGetDtoByStatusEncours(): Observable<UtilisateurGetDto[]> {
    return this.http.get<UtilisateurGetDto[]>(`${this.apiServerUrl}/utilisateurs/searchAnnonceByStatusEncours`);
  }


  public countNumberOfutilisateurs(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfutilisateurs`);
  }

  public countNumberOfAnnonceByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfAnnonceByStatusPending`);
  }

}

