import { Component, OnInit } from '@angular/core';
import {Member} from '../../models/member.mudule';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.module';

@Component({
  selector: 'app-attacheventtoorg',
  templateUrl: './attacheventtoorg.component.html',
  styleUrls: ['./attacheventtoorg.component.scss']
})
export class AttacheventtoorgComponent implements OnInit {

  member: Member;
  evenements: Event[] = [];
  selectedItem: string;
  selectedItem2: string;
  dataSource: Member[] = [] ;
  form: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private evenementService: EventService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.memberService.getAllmembersType().then(data => {
      this.dataSource = data ;
    });
    this.evenementService.getAllEvents().then(data => {
      this.evenements  = data;
    });
    this.form = this.formBuilder.group({
      member: ['', Validators.required],
      evenement: ['', Validators.required],
    });
  }
  private initForm(item: Member): void {
    this.form = new FormGroup({});
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.evenementService.affecteevttoorg(this.selectedItem, this.selectedItem2).then(() => {
        this.router.navigate(['./events']);
      });
    } else {
      return;
    }
  }
}
