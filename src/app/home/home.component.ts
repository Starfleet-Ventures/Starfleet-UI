import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('twe') heading: ElementRef;
  word: string = "";
  words: string[]=['From Satellite Data', 'To Drive Decision Making','For A Sustainable Tomorrow']
  i: number = 0;
  speed: number = 50;
  constructor() { }
  currentIdx:number =0;
  x=2.5;

  ngOnInit(){
    this.rotateWords();
    setInterval(()=>{
      this.rotateWords()
    },this.x*1000)
    }

  rotateWords(){

    if(this.currentIdx>=this.words.length){
      this.currentIdx=0;
    }

          this.word=this.words[this.currentIdx];
          this.currentIdx++
  }

}
