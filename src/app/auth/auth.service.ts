import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService{
user=new BehaviorSubject<User>(null);

private tokenexpirationTime: any;

isAuthor=false;
Admin:string=environment.email;
signup_url=environment.SIGNUP_URL;
signin_url=environment.SIGNIN_URL;
access_key=environment.ACCESS_KEY;

    constructor(private http: HttpClient,
                private router: Router){}

    signup(email:string, password:string){
       return this.http.post<AuthResponseData>(`${this.signup_url}key=${this.access_key}`,
        {
            email: email,
            password: password,
            returnSecureToken:true
        }
        ).pipe(catchError(this.handleError), 
        tap(resData=>{
            this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));  
    }

    login(email:string, password:string){
        return this.http.post<AuthResponseData>(`${this.signin_url}key=${this.access_key}`,
        {
            email: email,
            password: password,
            returnSecureToken:true  
        }).pipe(catchError(this.handleError),
            tap(resData=>{
            this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin(){
        const userData:{email:string,
                         id:string,
                         _token:string,
                         _tokenexpirationDate: Date}=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenexpirationDate));
            if(loadedUser.token){
                this.user.next(loadedUser);
                const tokenexpiretime=new Date(userData._tokenexpirationDate).getTime()-new Date().getTime();
                this.autoLogout(tokenexpiretime);
            }
    }

    logout(){
        this.user.next(null);
        this.isAuthor=false;
        this.router.navigate['/auth'];
        localStorage.removeItem('userData');
        if(this.tokenexpirationTime){
            clearTimeout(this.tokenexpirationTime);
        }
    }

    autoLogout(expirationtime: number){
       this.tokenexpirationTime= setTimeout(() => {
            this.logout();
        }, expirationtime);
    }

    private handleUser(email:string, userId:string, token:string, expiresIn: number){
        const expirationDate=new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
            if(user.email===this.Admin){
                this.isAuthor=true;
            }
           
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage='An unknown error occurred';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(()=>errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage='Email or Password invalid';
                break;
            case 'INVALID_PASSWORD':
                errorMessage='Email or Password invalid';
                break;
            case 'USER_DISABLED':
                errorMessage='The user account has been disabled by an administrator.';
                break;
        }
        return throwError(()=>errorMessage)
    }
}