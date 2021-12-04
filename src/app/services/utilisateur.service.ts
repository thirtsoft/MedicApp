import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { UtilisateurDto } from './../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

//  private apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "http://localhost:8081/website/v1";

  public apiServerUrl = "https://medic-admin.herokuapp.com/website/v1";

  id;
  currentUser: any = {};


  constructor(private http: HttpClient
  ) {
  }

  /**************************** UtilisateurDto ******************/
  public getUtilisateurDtos(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/all`);
  }

  public getAllUtilisateurDtosOrderByIdDesc(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.apiServerUrl}/utilisateurs/searchAllUtilisateurOrderByIdDesc`);
  }

  public getUtilisateurDtoById(userId: number): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/findById/${userId}`);
  }

  public addUtilisateurDto(utilisateurDTO: UtilisateurDto): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/create`, utilisateurDTO);
  }

  public updateUtilisateurDto(utilisateurId: number, utilisateurDTO: UtilisateurDto): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.apiServerUrl}/utilisateurs/update/${utilisateurId}`, utilisateurDTO);
  }

  public getUserAvatar(id: number){
    return this.http.get(`${this.apiServerUrl}/utilisateurs/avatar/`+ id);
  }

  uploadPhotoUtilisateur(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/utilisateurs/uploadUserPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public deleteUtilisateurDto(utilisateurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/utilisateurs/delete/${utilisateurId}`);
  }

}

