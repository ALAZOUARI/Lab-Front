import { Component, OnInit } from '@angular/core';
import {Member} from '../../models/member.mudule';
import {Teacher} from '../../models/teacher.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {TeacherService} from '../../services/teacher.service';
import {Event} from '../../models/event.module';

@Component({
  selector: 'app-attachsuptostu',
  templateUrl: './attachsuptostu.component.html',
  styleUrls: ['./attachsuptostu.component.scss']
})
export class AttachsuptostuComponent implements OnInit {
  student: Member;
  teacher: Teacher;
  form: FormGroup;
  dataSource: Member[] = [] ;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.memberService.getAllmembers().then(data => {
      this.dataSource = data ;
    });
    this.initForm(null);
  }
  private initForm(item: Member): void {
    this.form = new FormGroup({});
  }


  onSubmit(): void {
  }
}
