import { Component, OnInit } from '@angular/core';
import {Member} from '../../models/member.mudule';
import {Teacher} from '../../models/teacher.module';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-attachsuptostu',
  templateUrl: './attachsuptostu.component.html',
  styleUrls: ['./attachsuptostu.component.scss']
})
export class AttachsuptostuComponent implements OnInit {
  student: Member;
  teachers: Teacher[] = [];
  selectedItem: string;
  selectedItem2: string;
  dataSource: Member[] = [] ;
  form: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private memberService: MemberService,
              private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.memberService.getAllmembers().then(data => {
      this.dataSource = data ;
    });
    this.teacherService.getAllmembers().then(data => {
      this.teachers  = data;
    });
    this.form = this.formBuilder.group({
      student: ['', Validators.required],
      teacher: ['', Validators.required],
    });
  }
  private initForm(item: Member): void {
    this.form = new FormGroup({});
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.memberService.affectencadranttoetd(this.selectedItem, this.selectedItem2).then(() => {
        this.router.navigate(['./members']);
      });;
    } else {
      return;
    }
  }
}
