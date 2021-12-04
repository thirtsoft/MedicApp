import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { TokenStorageService } from './token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from './register';
import { ProfilInfo, UpdatePasswordInfo, UpdateUsernameInfo, UpdateProfilInfo, UpdatePasswordUser, UpdateUsernameUser } from './profil-info';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Login } from './login';
import { UtilisateurDto } from './../../models/utilisateur';

//const AUTH_API = 'http://localhost:8081/website/v1/';

const AUTH_API = 'https://medic-admin.herokuapp.com/website/v1/';


const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


//  public loginUrl = 'http://localhost:8081/website/v1/auth/signIn';

  public loginUrl = 'https://medic-admin.herokuapp.com/website/v1/auth/signIn';


//  public baseUrl_1 = 'http://localhost:8081/website/v1';

  public baseUrl_1 = 'https://medic-admin.herokuapp.com/website/v1';

//  public apiServerUrl = 'http://localhost:8081/website/v1/auth/authenticated';

  public apiServerUrl = 'https://medic-admin.herokuapp.com/website/v1/auth/authenticated';





  choixmenu : string  = 'A';
  dataForm:  FormGroup;

  listData: UtilisateurDto;
  listDataUsername: UpdateUsernameInfo;

  listDataProfil: ProfilInfo;

  islogin = false ;

  profileInfo: ProfilInfo = {} as ProfilInfo;
  userId;
  user;
  currentUser = {};

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  signUp(info: Register): Observable<Register> {
    return this.http.post<Register>(AUTH_API + 'auth/signUp', info , httpOptions);
  }

  attemptAuth(credentials): Observable<any> {
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post(this.loginUrl, loginData, httpOptions);
    this.islogin=true;
  }


  getCurrentUser(){
    return this.http.get(AUTH_API + '/auth/currentUser');
  }

  getCurrentLogginUser(){
    return this.http.get(AUTH_API + '/auth/currentLogginUser');
  }



  public updateProfil(userId: number, userDTO: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    return this.http.put<UpdateProfilInfo>(`${this.apiServerUrl}/utilisateurs/update/${userId}`, userDTO);
  }

  updateCustomerProfil(item: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    const urlUpdateUserProfile = (`${this.baseUrl_1}/utilisateurs/updateCustomerProfileByUsername/`);
    return this.http.patch<UpdateProfilInfo>(urlUpdateUserProfile, {
      id: item.id,
      oldUsername: item.oldUsername,
      name: item.name,
      username: item.username,
      email: item.email,
      mobile: item.mobile,
    }, httpOptions);

  }


  updateUsername(item: UpdateUsernameInfo): Observable<UpdateUsernameInfo> {
    const urlUpdateUsername = (`${this.baseUrl_1}/utilisateurs/updateUsernameOfUserByUsername`);
  //  return this.http.patch<UpdateUsernameInfo>("//localhost:8081/alAmine/updateUsername", {
    return this.http.patch<UpdateUsernameInfo>(urlUpdateUsername, {
      username: item.username,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updateUsernameByUserId(item: UpdateUsernameUser): Observable<UpdateUsernameUser> {
    const urlUpdateUsername = (`${this.baseUrl_1}/utilisateurs/updateUsernameOfUserById`);
    return this.http.patch<UpdateUsernameUser>(urlUpdateUsername, {
      id: item.id,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updatePassword(item: UpdatePasswordInfo): Observable<UpdatePasswordInfo> {
    const urlUpdatePassword = (`${this.baseUrl_1}/utilisateurs/updatePasswordByUsername`);
    return this.http.patch<UpdatePasswordInfo>(urlUpdatePassword, {
      username: item.username,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }

  updatePasswordByUserId(item: UpdatePasswordUser): Observable<UpdatePasswordUser> {
    const urlUpdatePassword = (`${this.baseUrl_1}/utilisateurs/updatePasswordByUserId`);
    return this.http.patch<UpdatePasswordUser>(urlUpdatePassword, {
      userId: item.id,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }


}
