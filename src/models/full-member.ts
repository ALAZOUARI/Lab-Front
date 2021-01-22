import {Publication} from './publication.module';
import {Tool} from './tool.module';
import {Event} from './event.module';
import {Teacher} from './teacher.module';

export class FullMember {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  password: string;
  email: string;
  cv: string;
  encadrant: Teacher;
  pubs: Publication[];
  outils: Tool[];
  evenements: Event[];
  dateInscription: string;
  diplome: string;
}
