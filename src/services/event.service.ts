import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.mudule';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Event} from '../models/event.module';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  private path = `${environment.gatewayEndpont}/evenementservice`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members ;


  constructor(
    private httpClient: HttpClient
  ) { }


  getAllEvents(): Promise<Event[]>{
    return this.httpClient.get<Event[]>(`${this.path}/evenements`).toPromise();
  }
  getEventByById(id: string): Promise<Event>{
    return this.httpClient.get<Event>(`${this.path}/evenements/${id}`).toPromise();
  }

  saveEvent(member: Event): Promise<Event>{
    if (!!member.id){
      return this.updateEvent(member.id, member);
    }else{
      return this.createEvent(member);
    }
  }
  createEvent(member: any): Promise<Event>{
    return this.httpClient.post<Event>(`${this.path}/evenements`, member).toPromise();
  }
  updateEvent(id: string, member: Event): Promise<Event>{
    return this.httpClient.put<Event>(`${this.path}/evenements/${id}`, member).toPromise();
  }
  removeEventById(id: string): Promise<void>{
    return this.httpClient.delete<void>(`${this.path}/evenements/${id}`).toPromise();
  }
  affecteevttoorg(idorg: string, idevt: string): Promise<any>{
    const params1 = new HttpParams()
      .set('idorg', idorg);
    const params2 = new HttpParams()
      .set('idevt', idevt);
    return this.httpClient.put<Member>('http://localhost:9999/membreservice/membres/organisateur', {}, { params: {idorg, idevt }})
      .toPromise();
  }
}
