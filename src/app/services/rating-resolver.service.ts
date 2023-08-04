import { ResolveFn } from "@angular/router";
import { Rating } from "../models/rating.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { RatingService } from "./rating.service";


export const ratingResolve: ResolveFn<Rating[]>=(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Rating[]> | Promise<Rating[]> | Rating[]=>{
        const datastorageService = inject(DataStorageService);
       const ratingService = inject(RatingService)
        const ratings= ratingService.getRatings();

        if(ratings.length ===0){
            return datastorageService.fetchRatings();
        }else
        {
           return ratings;
        }
    }