import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderInterface } from '../../Layout/common/loader-component/loader-interface';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderInterface>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderInterface>{
      show: true
    });
  }

  hide() {
    this.loaderSubject.next(<LoaderInterface>{
      show: false
    });
  }
}
