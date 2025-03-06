import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Camera",{name:"", bid:0}, "src/assets/camera.jpg", 12))
    auctions.push(new Auction("A-67", "Sofa",{name:"", bid:0}, "src/assets/sofa.jpg", 120))
    auctions.push(new Auction("S-991","Pink plate",{name:"", bid:0}, "src/assets/pinkplate.jpg", 10))
};


