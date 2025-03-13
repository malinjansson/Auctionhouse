import { Socket,io } from "socket.io-client";
import { Auction } from "./data/auction";
import { updateCountdown } from "./functions/countdown";

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
    const auctionName = document.getElementById("auctionName") as HTMLHeadingElement;
    auctionName.innerHTML = data.name;

    const dateTime = new Date(data.endtime);

    const endtime = document.getElementById("endtime") as HTMLSpanElement;
    endtime.innerHTML = dateTime.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })

    const auctionImg = document.getElementById("auctionImg") as HTMLImageElement;
    auctionImg.src = data.img;

    data.endtime = new Date(data.endtime);
    updateCountdown(data);

    const startPrice = document.getElementById("startPrice") as HTMLSpanElement;
    startPrice.innerHTML = data.minprice.toString();
  })

  socket.on('errorMessage', (errorMessage:string) => {
    alert(errorMessage);
  })


  socket.on ('updated bid', (data: {bidderName:string, bidAmount:string}) => {

    const highestBidder = document.getElementById("highestBidder") as HTMLParagraphElement;
    const currentBid = document.getElementById("currentBid") as HTMLParagraphElement;
  
    highestBidder.innerHTML = data.bidderName
    currentBid.innerHTML = data.bidAmount.toString() + " kr";
    
  })
