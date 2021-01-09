import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {Event} from '../../models/event.module';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit , OnDestroy{
// tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = ['titre', 'lieu', 'date', 'actions'];
  dataSource: Event[] = [] ;


  constructor(private memberservice: EventService,
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
    this.memberservice.getAllEvents().then(data => {
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
        this.memberservice.removeEventById(id).then(() => this.fetchDataSource());
      }
    });
  }
}
