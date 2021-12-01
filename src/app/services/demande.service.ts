import { Observable } from 'rxjs';
import { DemandeDto } from './../models/demande';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

//  private apiServerUrl = environment.apiBaseUrl;

  public apiServerUrl = "http://localhost:8081/website/v1";

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id;
  currentUser: any = {};

  formDataDemande: DemandeDto = new DemandeDto();

  formData:  FormGroup;

  dataForm:  FormGroup;

  choixmenu : string  = 'A';
  listData : DemandeDto[];


  constructor(private http: HttpClient
  ) {
  }


  /**************************** DemandeDto ******************/
  public getDemandeDtos(): Observable<DemandeDto[]> {
    return this.http.get<DemandeDto[]>(`${this.apiServerUrl}/demandes/all`);
  }

  public getDemandeDtosOrderDesc(): Observable<DemandeDto[]> {
    return this.http.get<DemandeDto[]>(`${this.apiServerUrl}/demandes/allDemandesOrderDesc`);
  }

  public getDemandeDtoById(demId: number): Observable<DemandeDto> {
    return this.http.get<DemandeDto>(`${this.apiServerUrl}/demandes/findById/${demId}`);
  }

  public addDemandeDto(demandeDto: DemandeDto): Observable<DemandeDto> {
    return this.http.post<DemandeDto>(`${this.apiServerUrl}/demandes/create`, demandeDto);
  }

  public addDemandeDtoWithFiles(demande, file:File): Observable<any> {
    const data:FormData= new FormData();
    data.append('demande',JSON.stringify(demande));
    data.append('file',file);

    return this.http.post(`${this.apiServerUrl}/demandes/createDemandeWithFile`, data, {responseType: 'text'});
  }

  public addDemandeDtoWithUser(demandeDto: DemandeDto, id: number): Observable<DemandeDto> {
    return this.http.post<DemandeDto>(`${this.apiServerUrl}/demandes/createAnnonceWithUser?id=`+id, demandeDto);
  }

  public updateDemandeDto(demId: number, demandeDto: DemandeDto): Observable<DemandeDto> {
    return this.http.put<DemandeDto>(`${this.apiServerUrl}/demandes/update/${demId}`, demandeDto);
  }

  updateStatusOfDemande(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    const urlUpdateStatusOfDemande = (this.apiServerUrl+"/demandes/updateStatusOfDemande/"+id+"?status="+data.status);
    return this.http.patch<any>(urlUpdateStatusOfDemande, {headers: headers});
  }

  public updatePriceAndNumberOfDayOfDemandeDto(id: number, price: string, nbreJours: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"price":price, "nbreJours": nbreJours};
    const urlUpdatePriceAndNumberOfDay = (this.apiServerUrl+"/demandes/updatePriceAndNumberOfDayOfDemandeByID/"+id+"?price="+data.price+"&nbreJours="+data.nbreJours);
    return this.http.patch<any>(urlUpdatePriceAndNumberOfDay, {headers: headers});

  }


  public deleteDemandeDto(demId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/demandes/delete/${demId}`);
  }

  getListOfDemandeByStatusPending(): Observable<DemandeDto[]> {
    return this.http.get<DemandeDto[]>(`${this.apiServerUrl}/demandes/allPendingDemandesOrderByIdDesc`);
  }

  getAllDemandesByStatusRefused(): Observable<DemandeDto[]> {
    return this.http.get<DemandeDto[]>(`${this.apiServerUrl}/demandes/allRefusedDemandesOrderByIdDesc`);
  }

  getAllDemandesByStatusValidated(): Observable<DemandeDto[]> {
    return this.http.get<DemandeDto[]>(`${this.apiServerUrl}/demandes/allValidatedDemandesOrderByIdDesc`);
  }




}
