import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers:[]
})

export class RatingComponent implements OnInit,OnDestroy {

  constructor(private dataService:DataService) {}

  @Output() sentRating=new EventEmitter();
  check2=1;
  signupForm2: FormGroup;
  ratings=["1 ","2 ","3 ","4 ","5 "];
  rating='';

  ngOnInit(): void
  {
    this.dataService.appData.subscribe((data)=>{
      if(data['id']){
        this.rating=data['rating'];
        this.signupForm2.patchValue({
          'rating':this.rating,
        })
      }}),

    this.dataService.check2.subscribe((data)=>{
      this.check2=data;
    
      if(this.check2==5)
      {
        this.signupForm2.reset();
        this.signupForm2.patchValue({
          'rating':'',
        })
        
        this.dataService.checkValue(3);
      }
      else if(this.check2==0){
        this.signupForm2.get('rating').markAsTouched()
      }
    });
    
    this.signupForm2=new FormGroup({
        'rating': new FormControl('', Validators.required),
    })
  }

  ngOnDestroy(){
    this.dataService.appData.unsubscribe();
    this.dataService.check2.unsubscribe();
  }
  
  sendData(){
    this.sentRating.emit(this.signupForm2.value.rating);
  }
}
