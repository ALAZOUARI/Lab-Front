import {Component, OnDestroy, OnInit} from '@angular/core';
import {GLOBAL} from '../app-config';
import {MemberService} from '../../services/member.service';
import {Member} from '../../models/member.mudule';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['cin', 'name', 'cv', 'type', 'email', 'dateInscription', 'diplome' , 'encadrant', 'actions'];
  dataSource: Member[] = [] ;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private memberservice: MemberService,
              private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  ngOnInit(): void {
    this.fetchDataSource();
  }

  // tslint:disable-next-line:typedef
  private fetchDataSource(): void{
    this.memberservice.getAllmembers().then(data => {
      this.dataSource = data;
    });
  }

  onRemoveAccount(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberservice.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });

  }

  getType(discriminatorValue: any): string {
    if (discriminatorValue === 'ens'){
      return 'Enseignant';
    }else{
      return 'Etudiant';
    }
  }

  getEncadrantName(encadrant: any): string {
    if (!!encadrant){
      return (encadrant.nom + ' ' + encadrant.prenom);
    }
    else{
      return ' ';
    }
  }

  navigateToProfile(id):void {
    this.router.navigate(['./memberprofile/' + id], {relativeTo: this.activatedRoute});
  }
}
