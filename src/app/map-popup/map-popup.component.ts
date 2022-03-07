import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit {
  @Input() imgUrl;
  constructor() { }

  ngOnInit(): void {
  }
  submit(): void {
    const rawpath = this.imgUrl.split('/');
    const name = rawpath[rawpath.length-1].split('.')[0];
    // console.log(name);
    const file = new File([name],this.imgUrl,{type:'image/jpg'});
    console.log(file);
  }
}
