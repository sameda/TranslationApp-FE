import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserPatchDto } from "app/interface/user/user";

@Injectable()
export class UserService {

    private mainUrl: string = environment.server_url + '/api/';

    constructor(private http: HttpClient){}

    public getUserById(id: number): Observable<HttpResponse<any>> {
        return this.http.get(this.mainUrl + 'GetUserById/' + id, {observe: 'response'})
    }

    
    public updateUser(id: number, dto: UserPatchDto): Observable<HttpResponse<any>> {
        return this.http.patch(this.mainUrl + 'UpdateUser/' + id, dto, {observe: 'response'});
    }


}