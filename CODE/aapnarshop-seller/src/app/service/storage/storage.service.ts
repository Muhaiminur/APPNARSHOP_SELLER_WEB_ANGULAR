import { Injectable } from '@angular/core';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/Model/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  stor: StorageMap;
  constructor(private storage: StorageMap) {
    this.stor = storage;
  }
  public setcounter(a: string, b: string) {
    console.log("working2")
    this.storage.set(a, b).subscribe(() => { });
  }

  public setuser(key: string, user: User) {
    this.storage.set(key, user).subscribe(() => { });
  }
  public setuserID(key: string, user: string) {
    this.storage.set(key, user).subscribe(() => { });
  }


  // Write
  /* delete(index: string): Observable<storage> {}
  clear(): Observable<storage> {} */

  // Read (one-time)
  /* get(index: string): Observable<unknown> {}
  get<T>(index: string, schema: JSONSchema): Observable<T> {} */

  // Observe (version >= 9)
  /* watch(index: string): Observable<unknown> {}
  watch<T>(index: string, schema: JSONSchema): Observable<T> {} */

  // Advanced
  /* size: Observable<number>;
  has(index: string): Observable<boolean> {}
  keys(): Observable<string> {} */


  getClientData(_input: any) {
    var result = '';
    if (localStorage.getItem('eshops_seller_user') !== null) {
      let eshops_vars = localStorage.getItem('eshops_seller_user');
      let eshops = JSON.parse(eshops_vars);
      Object.keys(eshops).forEach(key => {
        if (key == _input) {
          result = eshops[_input];
        }
      });
    } else {
      result = '';
      console.log('Local Storage Not Found');
    }
    return result;
  }

  setClientData(user: User) {
    localStorage.setItem('eshops_seller_user', JSON.stringify(user));
  }

  setClientDataSingle(_item: any, _newVal: any) {
    if (localStorage.getItem('eshops_seller') !== null) {
      let eshops_vars = localStorage.getItem('eshops_seller');
      let eshops = JSON.parse(eshops_vars);
      Object.keys(eshops).forEach(key => {
        if (key == _item) {
          eshops[key] = _newVal;
        }
      });
      localStorage.setItem('eshops_seller', JSON.stringify(eshops));
      window.location.reload();
    }
  }
}
