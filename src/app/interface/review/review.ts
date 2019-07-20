export interface ReviewsDto<T> {
    reviews: Array<T>,
    url: string,
    averageRating:number
}

export interface GeneralReviewDto {
    fullName: string;
    postDate: any;
    reviewTitle: string;
    postReview: string;
    starRating: string;
    averageRating: number;
    recommendation: string;
}

export interface YelpReviewDto {
    id: string;
    url: string;
    text: string;
    rating: number;
    time_created: Date;
    user: YelpUser;
}

export interface YelpUser {
    id:string;
    profile_url:string;
    image_url:string;
    name: string         
    
}
