import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../models/member.mudule';
import {Publication} from '../../models/publication.module';
import {MemberService} from '../../services/member.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {PublicationService} from '../../services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit , OnDestroy{
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['titre', 'type', 'dateApparition', 'sourcePdf', 'actions'];
  dataSource: Publication[] = [] ;


  constructor(private memberservice: PublicationService,
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
    this.memberservice.getAllpubs().then(data => {
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
        this.memberservice.removePubById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
