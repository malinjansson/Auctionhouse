import { Socket,io } from "socket.io-client";
import { Auction } from "./data/auction";

  // // SMARTASTE ROOMHANTERINGEN

  const currentRoom = new URLSearchParams(document.location.search).get('room');
  const socket:Socket = io('http://localhost:3000',{
    query: {
        roomName: currentRoom,
    },
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
      });  

  const placeBidBtn = document.getElementById("placeBidBtn") as HTMLButtonElement;

  placeBidBtn.addEventListener("click", () => {

      const bidderName = (document.getElementById("bidderName") as HTMLInputElement).value;
      const bidAmount = (document.getElementById("bidAmount") as HTMLInputElement).value;

      socket.emit('placeLatestBid', {bidderName, bidAmount});

      
      (document.getElementById("bidderName") as HTMLInputElement).value = "";
      (document.getElementById("bidAmount") as HTMLInputElement).value = "";
  })

  socket.on ('auctionData', (data: Auction) => {
    const auctionName = document.getElementById("auctionName") as HTMLElement;
    auctionName.innerHTML = data.name;
  })

  socket.on('errorMessage', (errorMessage:string) => {
    alert(errorMessage);
  })


  socket.on ('updated bid', (data: {bidderName:string, bidAmount:string}) => {

    console.log(data.bidderName)

    const latestBidder = document.getElementById("latestBidder") as HTMLElement;
    const latestBid = document.getElementById("latestBid") as HTMLElement;
  
    latestBidder.innerHTML = data.bidderName
    latestBid.innerHTML = data.bidAmount.toString();
    
  })

