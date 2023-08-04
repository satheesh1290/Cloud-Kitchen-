

export class Rating{
    public finalrating:any;
    public ratedUsers: number;
    public totalratings: number;


    constructor(finalrating:number, ratedUsers: number, totalratings:number){      
        this.finalrating=finalrating;
        this.ratedUsers=ratedUsers;
        this.totalratings=totalratings;
    }
}