import { Component } from '@angular/core';
import { IconService } from './service/icon/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aapnarshop-seller';
  constructor(private customIconService: IconService) { }

  ngOnInit() {
    /* Loading Custom Icons */
    this.customIconService.load();
  }
}
