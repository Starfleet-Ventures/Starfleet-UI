import { Component, OnInit } from '@angular/core';
import {HeaderItemList} from './model/header.model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  menuItems: HeaderItemList[] = [
    {
      label: 'Login',
      href: '/login',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false,
      onlyOnMenu: true
      
    },
    {
      label: 'Register',
      href: '/register',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false,
      onlyOnMenu: true
      
    },
    {
      label: 'About',
      href: '#about',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      onlyOnMenu: false
      
    },
    {
      label: 'Features',
      href: '#features',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      onlyOnMenu: false
      
    },
    {
      label: 'Team',
      href: '#team',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      onlyOnMenu: false
      
    },
    {
      label: 'Industries',
      href: '/industries',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      onlyOnMenu: false
      
    },
    {
      label: 'Request A Demo',
      href: '#contact-us',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      onlyOnMenu: false
      
    },
   
  ];
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
