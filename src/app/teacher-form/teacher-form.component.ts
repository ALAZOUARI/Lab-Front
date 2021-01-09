import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {Teacher} from '../../models/teacher.module';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  currentitemId: string;
  item: Teacher;
  form: FormGroup ;
  hide = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: TeacherService
  ) { }

  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id ;
    if ( !!this.currentitemId){
      this.memberService.getMemberByById(this.currentitemId).then(item => {
        this.item = item ;
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    }else {
      this.initForm(null);
    }
  }
  private initForm(item: Teacher): void {
    this.form = new FormGroup({
      cin: new FormControl(!!item ? item.cin : null, [Validators.required]),
      nom: new FormControl(!!item ? item.nom : null, [Validators.required]),
      prenom: new FormControl(!!item ? item.prenom : null, [Validators.required]),
      date: new FormControl(!!item ? item.date : null, [Validators.required]),
      password: new FormControl(!!item ? item.password : null, [Validators.required]),
      email: new FormControl(!!item ? item.email : null, [Validators.required]),
      grade: new FormControl(!!item ? item.grade : null, [Validators.required]),
      cv: new FormControl(!!item ? item.cv : null, [Validators.required]),
      etablissement: new FormControl(!!item ? item.etablissement : null, [Validators.required]),
    });
  }


  onSubmit(): void {
    const objecttosubmit: Teacher = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.memberService.saveMember(objecttosubmit).then(() => {
      this.router.navigate(['./teachers']);
    });
  }
}
