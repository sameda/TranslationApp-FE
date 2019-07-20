import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'app/service/review.service';
import { HelperFunctions } from 'app/helper/functions';
import { ReviewsDto, YelpReviewDto, GeneralReviewDto } from 'app/interface/review/review';

@Component({

  templateUrl: './review-summary.component.html' 
})
export class ReviewSummaryComponent implements OnInit {

  googleLoading:boolean = true;
  fbLoading:boolean = true;
  taLoading:boolean = true;
  yelpLoading:boolean = true;

  yelpReviews: ReviewsDto<YelpReviewDto>
  fbReviews: ReviewsDto<GeneralReviewDto>
  taReviews: ReviewsDto<GeneralReviewDto>
  googleReviews: ReviewsDto<GeneralReviewDto>

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.getYelpReviews();
    this.getFbReviews();
    this.getGoogleReviews();
    this.getTripadvisorReviews()
  }

  private getYelpReviews() {
    this.reviewService.getYelpReviews().subscribe(resp => {
      this.yelpReviews = resp.body;
    }, err => {
      HelperFunctions.showNotification('bottom', 'right', 'Could not load yelp reviews', 'danger')
    }, () => {
      this.yelpLoading = false
    })
    // this.yelpLoading = false
  }

  private getFbReviews(){
    this.reviewService.getFacebookReviews().subscribe(resp => {
      this.fbReviews = resp.body;      
    }, err => {
      HelperFunctions.showNotification('bottom', 'right', 'Could not load facebook reviews', 'danger')
    }, () => {
      this.fbLoading = false
    })
  }

  private getTripadvisorReviews(){
    this.reviewService.getTripadvisorReviews().subscribe(resp => {
      this.taReviews = resp.body;     
    }, err => {
      HelperFunctions.showNotification('bottom', 'right', 'Could not load tripadvisor reviews', 'danger')
    }, () => {
      this.taLoading = false
    })
  }

  private getGoogleReviews(){
    this.reviewService.getGoogleReviews().subscribe(resp => {
      this.googleReviews = resp.body;     
    }, err => {
      HelperFunctions.showNotification('bottom', 'right', 'Could not load google reviews', 'danger')
    }, () => {
      this.googleLoading = false
    })
  }

  public getTAStars(stars: string) {
      return parseInt(stars)/10
  }


}
