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
      description: `Shapoor is an IT Solutions Architect working on AWS, AI Solutions, DevOps and Micro-Services with a passion for space technology and business innovation. He is an expert at synthesizing and communicating insights and recommendations to audiences of varying levels of technical sophistication. Shapoor managed multi-million dollar research funds as the COO of the only Canada-India Research Centres of Excellence (NCE) funded by ISED; facilitated over 40 projects and 7 spin-off companies arising from cutting-edge research. Earlier, as the director of business development at UBC he had led the growth charter for international business. Shapoor holds an MBA from UBC and is an alumnus of IIT Bombay (BTech-Aerospace & MTech-Reliability).`
    },
  ];
  createRange(i: number){
   
    return new Array(i);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
