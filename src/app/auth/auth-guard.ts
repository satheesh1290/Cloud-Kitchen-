import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";


export const AuthGuard: CanActivateFn= (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
       
     const authService = inject(AuthService);
     const router = inject(Router);

     return authService.user.pipe(map(user=>{
        if(!!user){
            return true;
            }else{
                router.navigate(['/auth']);
                return false;
            }
        }));
    }

    export const Admin: CanActivateFn= (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
           
         const authService = inject(AuthService);
         const router = inject(Router);
         const adminUser=environment.email;
    
         return authService.user.pipe(map(user=>{
            if(!!user && user.email === adminUser){
                return true;
                }else{
                    alert('Need Admin permission')
                    router.navigate(['/menu']);
                    return false;
                }
            }));
        }
    

export const canActivateChild: CanActivateChildFn = (
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot) => {
return AuthGuard(route, state);
}

