
export class Auction{
    constructor(
        public id:string, 
        public name:string, 
        public currentBid: Bidder,
        public img: string,
        public minprice:number,
        public endtime: Date
    ) {}
}

export class Bidder{
    constructor(
        public name:string,
        public bid:number
    ) {}
}