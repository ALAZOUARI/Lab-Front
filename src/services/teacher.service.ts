import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.mudule';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Teacher} from '../models/teacher.module';



@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private path = `${environment.gatewayEndpont}/membreservice`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members ;


  constructor(
    private httpClient: HttpClient
  ) { }


  getAllmembers(): Promise<Member[]>{
    return this.httpClient.get<Member[]>(`${this.path}/membres/enseignants`).toPromise();
  }
  getMemberByById(id: string): Promise<Teacher>{
    return this.httpClient.get<Teacher>(`${this.path}/membres/${id}`).toPromise();
  }

  saveMember(member: any): Promise<Member>{
    if (!!member.id){
      return this.updateMember(member.id, member);
    }else{
      return this.createMember(member);
    }
  }
  createMember(member: any): Promise<Member>{
    return this.httpClient.post<Member>(`${this.path}/membres/enseignant`, member).toPromise();
  }
  updateMember(id: string, member: Member): Promise<Member>{
    return this.httpClient.put<Member>(`${this.path}/membres/enseignant/${id}`, member).toPromise();
  }
  removeMemberById(id: string): Promise<void>{
    return this.httpClient.delete<void>(`${this.path}/membres/enseignant/${id}`).toPromise();
  }
}
