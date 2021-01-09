import { Component, OnInit } from '@angular/core';
import {Publication} from '../../models/publication.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicationService} from '../../services/publication.service';
import {Member} from '../../models/member.mudule';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  currentitemId: string ;
  item: Publication;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: PublicationService) { }


  ngOnInit(): void {
    this.currentitemId = this.activatedRoute.snapshot.params.id ;
    if (!!this.currentitemId){
      this.publicationService.getPubsByById(this.currentitemId).then(item => {
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
  private initForm(item: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(!!item ? item.titre : null, [Validators.required]),
      type: new FormControl(!!item ? item.type : null, [Validators.required]),
      sourcePdf: new FormControl(!!item ? item.sourcePdf : null, [Validators.required]),
      dateApparition: new FormControl(!!item ? item.dateApparition : null, [Validators.required]),
    });
  }
  onSubmit(): void {
    const objecttosubmit: Publication = {...this.item, ...this.form.value};
    console.log(this.form.value);
    this.publicationService.savePub(objecttosubmit).then(() => {
      this.router.navigate(['./publications']);
    });
  }


}
