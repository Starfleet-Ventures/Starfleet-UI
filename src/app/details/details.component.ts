import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  @Input() heading: string = "";
  @Input() paragraph: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
