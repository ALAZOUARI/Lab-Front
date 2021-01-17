import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Member} from '../models/member.mudule';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private path = `${environment.gatewayEndpont}/membreservice`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members ;


  constructor(
    private httpClient: HttpClient
  ) { }


  getAllmembers(): Promise<Member[]>{
    return this.httpClient.get<Member[]>(`${this.path}/membres/etudiants`).toPromise();
  }
  getMemberByById(id: string): Promise<Member>{
    return this.httpClient.get<Member>(`${this.path}/membres/${id}`).toPromise();
  }

  saveMember(member: any): Promise<Member>{
    if (!!member.id){
      return this.updateMember(member.id, member);
    }else{
      return this.createMember(member);
    }
  }
  createMember(member: any): Promise<Member>{
      return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  }
  updateMember(id: string, member: Member): Promise<Member>{
      return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }
  removeMemberById(id: string): Promise<void>{
    return this.httpClient.delete<void>(`${this.path}/membres/${id}`).toPromise();
  }
  affectencadranttoetd(idetd: string, idens: string): Promise<any>{
    const params1 = new HttpParams()
      .set('idetd', idetd);
    const params2 = new HttpParams()
      .set('idens', idens);
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant`, {}, { params: {idetd, idens }}).toPromise();
  }
}
