import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/service/loader/loader.service';
import { LoaderInterface } from './loader-interface';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.css']
})
export class LoaderComponentComponent implements OnInit {

  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderInterface) => {
          this.show = state.show;
          //this.percentage = state.percentage;
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
