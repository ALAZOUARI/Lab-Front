import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Tool} from '../models/tool.module';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Event} from '../models/event.module';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  private path = `${environment.gatewayEndpont}/outilservice`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members ;


  constructor(
    private httpClient: HttpClient
  ) { }


  getAllTools(): Promise<Tool[]>{
    return this.httpClient.get<Tool[]>(`${this.path}/outils`).toPromise();
  }
  getToolByById(id: string): Promise<Tool>{
    return this.httpClient.get<Tool>(`${this.path}/outils/${id}`).toPromise();
  }

  saveTool(member: Tool): Promise<Tool>{
    if (!!member.id){
      return this.updateTool(member.id, member);
    }else{
      return this.createTool(member);
    }
  }
  createTool(member: any): Promise<Tool>{
    return this.httpClient.post<Tool>(`${this.path}/outils`, member).toPromise();
  }
  updateTool(id: string, member: Tool): Promise<Tool>{
    return this.httpClient.put<Tool>(`${this.path}/outils/${id}`, member).toPromise();
  }
  removeEventById(id: string): Promise<void>{
    return this.httpClient.delete<void>(`${this.path}/outils/${id}`).toPromise();
  }
}
