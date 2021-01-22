import { Component, OnInit } from '@angular/core';
import {Member} from '../../models/member.mudule';
import {Teacher} from '../../models/teacher.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {TeacherService} from '../../services/teacher.service';
import {Publication} from '../../models/publication.module';
import {PublicationService} from '../../services/publication.service';

@Component({
  selector: 'app-attachpubtoaut',
  templateUrl: './attachpubtoaut.component.html',
  styleUrls: ['./attachpubtoaut.component.scss']
})
export class AttachpubtoautComponent implements OnInit {

  member: Member;
  publications: Publication[] = [];
  selectedItem: string;
  selectedItem2: string;
  dataSource: Member[] = [] ;
  form: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private publicationService: PublicationService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.memberService.getAllmembersType().then(data => {
      this.dataSource = data ;
    });
    this.publicationService.getAllpubs().then(data => {
      this.publications  = data;
    });
    this.form = this.formBuilder.group({
      member: ['', Validators.required],
      publication: ['', Validators.required],
    });
  }
  private initForm(item: Member): void {
    this.form = new FormGroup({});
  }


  onSubmit(): void {
    if (this.form.valid) {
      this.publicationService.affectepubtoaut(this.selectedItem, this.selectedItem2).then(() => {
        this.router.navigate(['./publications']);
      });;
    } else {
      return;
    }
  }

}
