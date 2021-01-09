import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../@root/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {Tool} from '../../models/tool.module';
import {EventService} from '../../services/tool.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit , OnDestroy{

// tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  displayedColumns: string[] = [ 'date', 'source', 'actions'];
  dataSource: Tool[] = [] ;


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
    this.memberservice.getAllTools().then(data => {
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
