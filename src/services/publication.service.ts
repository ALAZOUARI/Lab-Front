import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Publication} from '../models/publication.module';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Event} from '../models/event.module';



@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private path = `${environment.gatewayEndpont}/publicationservice`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members ;


  constructor(
    private httpClient: HttpClient
  ) { }


  getAllpubs(): Promise<Publication[]>{
    return this.httpClient.get<Publication[]>(`${this.path}/publications`).toPromise();
  }
  getPubsByById(id: string): Promise<Publication>{
    return this.httpClient.get<Publication>(`${this.path}/publications/${id}`).toPromise();
  }

  savePub(member: Publication): Promise<Publication>{
    if (!!member.id){
      return this.updatePub(member.id, member);
    }else{
      return this.createPub(member);
    }
  }
  createPub(member: any): Promise<Publication>{
    return this.httpClient.post<Publication>(`${this.path}/publications`, member).toPromise();
  }
  updatePub(id: string, member: Publication): Promise<Publication>{
    return this.httpClient.put<Publication>(`${this.path}/publications/${id}`, member).toPromise();
  }
  removePubById(id: string): Promise<void>{
    return this.httpClient.delete<void>(`${this.path}/publications/${id}`).toPromise();
  }
}
