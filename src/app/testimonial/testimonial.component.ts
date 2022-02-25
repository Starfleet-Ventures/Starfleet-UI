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
      name: 'Shiba Inu',
      org: 'Dog Breed',
      img: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      stars: 5,
      reviewTitle: 'Excellent',
      reviewContent: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
      bred for hunting.`
    },
    {
      name: 'Shiba Inu',
      org: 'Dog Breed',
      img: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      stars: 5,
      reviewTitle: 'Excellent',
      reviewContent: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
      bred for hunting.`
    }
  ];
  createRange(i: number){
   
    return new Array(i);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
