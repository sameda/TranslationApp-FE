import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class SchedulingService {

    private mainUrl: string = environment.server_url + '/api/Event';

    constructor(private http: HttpClient){}

    public getAllEvents(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl, {observe: 'response'})
    }

    public getAllEventsByUserId(id: number): Observable<HttpResponse<any>> {
        return this.http.get(environment.server_url + '/api/User/' + id + '/Event', {observe: 'response'})
    }

    public getEventById(id): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + "/" + id, {observe: 'response'})
    }

    public createEvent(dto, noScheduling = false): Observable<HttpResponse<any>> {
        let url = this.mainUrl;
        if(noScheduling)
            url = this.mainUrl + '?noScheduling=' + noScheduling
        return this.http.post(url, dto, {observe: 'response'})
    }

    public updateEvent(dto, noSchedulerChanges = false): Observable<HttpResponse<any>> {
        let url = this.mainUrl;
        if(noSchedulerChanges)
            url= this.mainUrl + '?noSchedulerChanges=' + noSchedulerChanges
        return this.http.patch(url, dto, {observe: 'response'})
    }
    public deleteEvent(id): Observable<HttpResponse<any>> {
        return this.http.delete(this.mainUrl + "/" + id, {observe: 'response'})
    }

}