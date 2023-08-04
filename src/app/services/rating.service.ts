import { Injectable, OnInit } from '@angular/core';
import { Rating } from '../models/rating.model';
import { Subject } from 'rxjs';

@Injectable()

export class RatingService implements OnInit{
  ratingChanges= new Subject<Rating[]>();

  constructor() { }

  ngOnInit(): void {
      
  }

  // private ratings:Rating[]=[
  //   new Rating(4.5, 1, 4.5),
  //   new Rating(4.0, 1, 4.0),
  //   new Rating(4.5, 1, 4.5),
  //   new Rating(5.0, 1, 4.5),
  //   new Rating(3.5, 1, 4.5),
  // ];

  private ratings:Rating[]=[];

  setRatings(ratings: Rating[]){
    this.ratings=ratings;
    this.ratingChanges.next(this.ratings.slice());
  }



  getRatings(){
    return this.ratings.slice();
  }

  getRating(index: number){
    return this.ratings[index];
  }

  addRating(rating: Rating){
    this.ratings.push(rating)
    this.ratingChanges.next(this.ratings);
  }

  updateRating(index: number, newRating: {finalrating:any, ratedUsers:number, totalratings:number}){
    this.ratings[index]=newRating;
    this.ratingChanges.next(this.ratings);
  }

  deleteRating(index: number){
    this.ratings.splice(index, 1);
    this.ratingChanges.next(this.ratings);
  }

  
}

