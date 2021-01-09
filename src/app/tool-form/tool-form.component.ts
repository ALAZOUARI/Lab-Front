import { Component, OnInit } from '@angular/core';
import {Tool} from '../../models/tool.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/tool.service';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {
  currentitemId: string ;
  item: Tool;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: EventService) { }


  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id ;
    if (!!this.currentitemId){
      this.publicationService.getToolByById(this.currentitemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch(() => {
        this.initForm(null);
      });
    }
    else {
      this.initForm(null);
    }
  }
  private initForm(item: Tool): void {
    this.form = new FormGroup({
      date: new FormControl(!!item ? item.date : null, [Validators.required]),
      source: new FormControl(!!item ? item.source : null, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objecttosubmit: Tool = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.publicationService.saveTool(objecttosubmit).then(() => {
      this.router.navigate(['./tools']);
    });
  }

}
