import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

@Injectable()
export class ModalService {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmModalComponent>;

        dialogRef = this.dialog.open(ConfirmModalComponent,{
        	height:'200px',
        	width:'450px'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
