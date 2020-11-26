import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  _currentYear: any;
  _about: any; _aboutus: any; _delivery: any; _exchange: any; _privacy: any;
  _copyright: any;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/instagram.svg'));
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/facebook.svg'));
    iconRegistry.addSvgIcon(
      'twitter',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/twitter.svg'));
    iconRegistry.addSvgIcon(
      'whatsapp',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/whatsapp.svg'));
  }

  ngOnInit(): void {
  }

}
