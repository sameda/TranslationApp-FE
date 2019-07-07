import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BulkSmsDto } from "app/interface/sms/bulkSms";


@Injectable()
export class SmsService {

    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public getSmsLogs(queryData: string): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'getAllSmsLogs' + queryData, {observe: 'response'})
    }

    public sendBulkSms(dto: BulkSmsDto): Observable<HttpResponse<any>> {
        return this.http.post(this.mainUrl + 'sendBulkSms', dto, {observe: 'response'})
    }
    
    public sendSms(dto): Observable<HttpResponse<any>> {
        return this.http.post(this.mainUrl + 'sendSms', dto, {observe: 'response'})
    }


}