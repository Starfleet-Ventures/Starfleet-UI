import { Component, OnInit } from '@angular/core';
import { TestimonialItem } from './model/testimonial.model';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.sass']
})
export class TestimonialComponent implements OnInit {
  testimonialList: TestimonialItem[] = [
    {
      name: 'Jeh Daruvala',
      img: '../../assets/img/jeh.png', 
      title: 'Founder and CEO',
      description: `Jeh is a serial tech entrepreneur and has 22 years of
      entrepreneurial, investment banking, and product management
      experience. Before migrating to Canada in 2002, Jeh played a key
      role in incubating Customer Asset, an India based IT infrastructure
      services venture that evolved into the $300 million, Firstsource
      Solutions. His first Canadian start-up, Yactraq, is a leading global
      provider in AI/ML based speech analytics.`
    }
  ];
  createRange(i: number){
   
    return new Array(i);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
