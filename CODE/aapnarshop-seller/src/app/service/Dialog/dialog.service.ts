import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DialogCommonComponent } from 'src/app/Layout/common/Dialog/dialog-common/dialog-common.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<DialogCommonComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(DialogCommonComponent, {
      data: {
        textTitle: options.textTitle,
        textBody: options.textBody,
        textCancel: options.textCancel,
        textConfirm: options.textConfirm
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef
      .afterClosed()
      .pipe(take(1), map(res => {
        return res;
      }));
  }

}
