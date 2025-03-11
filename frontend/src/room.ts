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

    const auctionImg = document.getElementById("auctionImg") as HTMLImageElement;
    auctionImg.src = data.img;
  })

  socket.on('errorMessage', (errorMessage:string) => {
    alert(errorMessage);
  })


  socket.on ('updated bid', (data: {bidderName:string, bidAmount:string}) => {

    console.log(data.bidderName)

    const highestBidder = document.getElementById("highestBidder") as HTMLElement;
    const currentPrice = document.getElementById("currentPrice") as HTMLElement;
  
    highestBidder.innerHTML = data.bidderName
    currentPrice.innerHTML = data.bidAmount.toString();
    
  })

