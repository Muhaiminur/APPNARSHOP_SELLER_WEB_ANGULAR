import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_sub1: Subscription;
  sellerid: string;
  constructor(private router: Router, private storageMap: StorageMap, private stor: StorageService) {
    this.user_sub1 = this.storageMap.watch('userid', { type: 'string' })
      .subscribe((result) => {
        this.sellerid = result;
      });
  }
  public logout() {
    this.storageMap.delete('user').subscribe(() => { });
    this.storageMap.delete('userid').subscribe(() => { });
    this.router.navigate(['/']);
    window.location.reload();
  }

  public currentUserId(): any {
    if (this.stor.getClientData('sellerId') !== '8800000000000' && this.stor.getClientData('sellerId') !== "") {
      return this.stor.getClientData('sellerId');
    } else {
      return "8800000000000";
    }
  }

  public userloggedin(): any {
    if (this.stor.getClientData('sellerId') !== '8800000000000' && this.stor.getClientData('sellerId') !== "") {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.user_sub1.unsubscribe();
  }
}