import { RowDataPacket } from "mysql2";
import { Auction, Bidder } from "./auction";
import { connection } from "./connection";

export let auctions:Array<Auction> = []

export interface databaseauction extends RowDataPacket {
    id:string, 
    name:string, 
    img: string,
    minprice:number,
    endtime: Date
    biddername: string,
    bidprice: number
}

export async function Init(){
    const conn = await connection;
    const [rows] = await conn.query<databaseauction[]>("SELECT * FROM auction")

    rows.forEach((row: databaseauction) => {
        const auction = new Auction(row.id, row.name, new Bidder(row.biddername, row.bidprice), row.img, row.minprice, row.endtime)

        auctions.push(auction);
    })
};


