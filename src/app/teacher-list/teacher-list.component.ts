import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../models/member.mudule';
import {MemberService} from '../../services/member.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {TeacherService} from '../../services/teacher.service';
import {Teacher} from '../../models/teacher.module';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit , OnDestroy{

  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['cin', 'name', 'cv', 'type', 'email', 'grade' , 'etablissement', 'actions'];
  dataSource: Teacher[] = [] ;

  constructor(private memberservice: TeacherService,
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

}
