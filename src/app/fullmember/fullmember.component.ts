import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../services/member.service';
import {FullMember} from '../../models/full-member';

@Component({
  selector: 'app-fullmember',
  templateUrl: './fullmember.component.html',
  styleUrls: ['./fullmember.component.scss']
})
export class FullmemberComponent implements OnInit {
  currentitemId: string;
  fullmember: FullMember;
  displayedColumns: string[] = ['titre', 'sourcePdf'];
  displayedColumns1: string[] = ['title', 'lieu'];
  constructor(private activatedRoute: ActivatedRoute,
              private memberService: MemberService) { }

  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id;
    this.memberService.getFullmembers(this.currentitemId).then(item => {
      this.fullmember = item;
    });
  }
  getType(discriminatorValue: any): string {
    if (discriminatorValue === 'ens'){
      return 'Teacher';
    }else{
      return 'Student';
    }
  }

}
