import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class SmsService {

    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public getSmsLogs(queryData: string): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'getAllSmsLogs' + queryData, {observe: 'response'})
    }


}