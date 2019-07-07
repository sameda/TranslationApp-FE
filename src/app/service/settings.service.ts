import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { SettingsPatchDto } from "app/interface/settings/settings";

@Injectable()
export class SettingsService {
    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public getSettings(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'Settings', {observe: 'response'})
    }

    public saveSettings(dto: Array<SettingsPatchDto>): Observable<HttpResponse<any>> {
        return this.http.patch(this.mainUrl + 'Settings', dto, {observe: 'response'})
    }

}