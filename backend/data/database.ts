import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Camera",{name:"None", price:200}, "src/assets/camera.jpg", 200, new Date('2025-03-14T14:20:00')))
    auctions.push(new Auction("A-67", "Sofa",{name:"None", price:150}, "src/assets/sofa.jpg", 150, new Date('2025-03-28T09:14:00')))
    auctions.push(new Auction("S-991","Pink plate",{name:"None", price:50}, "src/assets/pinkplate.jpg", 50, new Date('2025-05-10T11:48:00')))
};


