import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse, HttpHeaders, HttpBackend } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserPatchDto } from "app/interface/user/user";
import { RequestOptions } from "@angular/http";

@Injectable()
export class UserService {

    private mainUrl: string = environment.server_url + '/api/';

    private httpClientBackend: HttpClient;
    constructor(private http: HttpClient, private handler: HttpBackend){
        this.httpClientBackend = new HttpClient(handler);
    }

    public getUserById(id: number): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'GetUserById/' + id, {observe: 'response'})
    }

    
    public updateUser(id: number, dto: UserPatchDto): Observable<HttpResponse<any>> {
        return this.http.patch(this.mainUrl + 'UpdateUser/' + id, dto, {observe: 'response'});
    }

    public resetPassword( token: string, dto: any): Observable<HttpResponse<any>> {
        let headers = new HttpHeaders(
            {
                'Authorization': 'Bearer  '+ token,
                // 'Skip_Interceptor': 'true'
            }
        );

        // use httpBackend to skip interceptor
        return this.httpClientBackend.patch(this.mainUrl + 'ResetPassword', dto, {headers: headers, observe: 'response'});
    }

    
    public getAllUsers(): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'GetAllUsers/', {observe: 'response'})
    }


}