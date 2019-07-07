import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class EmailService {

    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public sendEmail(dto): Observable<HttpResponse<any>> {
        return this.http.post(this.mainUrl + 'Email', dto, {observe: 'response'})
    }


}