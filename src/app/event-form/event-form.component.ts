import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicationService} from '../../services/publication.service';
import {Event} from '../../models/event.module';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentitemId: string ;
  item: Event;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: EventService) { }


  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id ;
    if (!!this.currentitemId){
      this.publicationService.getEventByById(this.currentitemId).then(item => {
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
  private initForm(item: Event): void {
    this.form = new FormGroup({
      title: new FormControl(!!item ? item.title : null, [Validators.required]),
      lieu: new FormControl(!!item ? item.lieu : null, [Validators.required]),
      date: new FormControl(!!item ? item.date : null, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objecttosubmit: Event = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.publicationService.saveEvent(objecttosubmit).then(() => {
      this.router.navigate(['./events']);
    });
  }


}
