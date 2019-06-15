import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserPatchDto } from "app/interface/user/user";

@Injectable()
export class TranslateService {

    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public translateAndSendSms(dto: any): Observable<HttpResponse<any>> {
        return this.http.post(this.mainUrl + 'translateAndSendSms', dto, {observe: 'response'})
    }


}