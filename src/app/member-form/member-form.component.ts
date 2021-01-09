import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Member} from '../../models/member.mudule';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentitemId: string;
  item: Member;
  form: FormGroup ;
  hide = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService
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
  private initForm(item: Member): void {
  this.form = new FormGroup({
    cin: new FormControl(!!item ? item.cin : null, [Validators.required]),
    nom: new FormControl(!!item ? item.nom : null, [Validators.required]),
    prenom: new FormControl(!!item ? item.prenom : null, [Validators.required]),
    date: new FormControl(!!item ? item.date : null, [Validators.required]),
    password: new FormControl(!!item ? item.password : null, [Validators.required]),
    email: new FormControl(!!item ? item.email : null, [Validators.required, Validators.email]),
    dateInscription: new FormControl(!!item ? item.dateInscription : null, [Validators.required]),

    cv: new FormControl(!!item ? item.cv : null, [Validators.required]),
    diplome: new FormControl(!!item ? item.diplome : null, [Validators.required]),

  });
  }


  onSubmit(): void {
    const objecttosubmit: Member = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.memberService.saveMember(objecttosubmit).then(() => {
      this.router.navigate(['./members']);
    });
  }
  // tslint:disable-next-line:typedef
  passwordInput() {
    return this.form.get('password');
  }
}
