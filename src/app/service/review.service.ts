import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class ReviewService {

    private mainUrl: string = environment.server_url + '/api/reviews/';

    constructor(private http: HttpClient){}

    public getYelpReviews(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'yelp', {observe: 'response'})
    }

    public getGoogleReviews(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'google', {observe: 'response'})
    }

    public getFacebookReviews(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'facebook', {observe: 'response'})
    }

    public getTripadvisorReviews(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'tripadvisor', {observe: 'response'})
    }

   

}