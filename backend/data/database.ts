import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Camera",{name:"None", price:200}, "src/assets/camera.jpg", 200))
    auctions.push(new Auction("A-67", "Sofa",{name:"None", price:150}, "src/assets/sofa.jpg", 150))
    auctions.push(new Auction("S-991","Pink plate",{name:"None", price:50}, "src/assets/pinkplate.jpg", 50))
};


