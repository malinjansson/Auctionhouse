import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Camera",{name:"None", price:200}, "src/assets/camera.jpg", 200, "14 mar 14:20"))
    auctions.push(new Auction("A-67", "Sofa",{name:"None", price:150}, "src/assets/sofa.jpg", 150, "28 mar 09:14"))
    auctions.push(new Auction("S-991","Pink plate",{name:"None", price:50}, "src/assets/pinkplate.jpg", 50, "10 mar 11:48"))
};


