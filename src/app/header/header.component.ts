import { Component, OnInit } from '@angular/core';
import {HeaderItemList} from './model/header.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  menuItems: HeaderItemList[] = [
    {
      label: 'About',
      href: '#about',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      
    },
    {
      label: 'Testimonials',
      href: '#testimonials',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      
    },
    {
      label: 'Demo',
      href: '#contact-us',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      
    },
   
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
