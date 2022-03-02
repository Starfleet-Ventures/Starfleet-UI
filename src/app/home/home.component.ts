import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('twe') heading: ElementRef;
  text: string = "Lorem Ipsum doret dummy text";
  i: number = 0;
  speed: number = 50;
  constructor() { }

  ngOnInit(): void {
    
  }

}
