import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Fin mugg",{name:"", bid:0},12))
    auctions.push(new Auction("A-67", "Ngt annat",{name:"", bid:0}, 120))
    auctions.push(new Auction("S-991","Fotboll",{name:"", bid:0}, 10))
};


