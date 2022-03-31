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
    },
    {
      name: 'Shapoor Marfatia',
      img: '../../assets/img/shapoor.png', 
      title: 'SVP Technology',
      description: `Shapoor is an experienced IT professional and has handled multi-million dollar research funds with the IC-IMPACTS (Canada-India NCE Research Centres of Excellence). He is an expert at synthesising and communicating
      insights and recommendations to audiences of varying levels of technical sophistication. As a director of business development at UBC he had led the growth charter for international business`
    },
  ];
  createRange(i: number){
   
    return new Array(i);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
