import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import *  as data  from './data/database';
import cors from 'cors';
import { Auction, Bidder } from './data/auction';
import { updateBid } from './data/database';

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin: "*"
  }
});

  // Serve static files (frontend)
  app.use(express.static('public'));

  // Socket.IO connection
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

  var query = socket.handshake.query;
  var roomName = query.roomName as string;
  socket.join(roomName);

  let auction = data.auctions.find(a => a.id === roomName) as Auction;
  socket.emit("auctionData", auction);

  socket.emit('updated bid', {bidAmount:auction.currentBid.price, bidderName:auction.currentBid.name});

  socket.on('placeLatestBid', (data: {bidderName:string, bidAmount:number}) => {
    if (data.bidAmount < auction.currentBid.price) {
      socket.emit('errorMessage', "Your bid is too low")
      return;
    } 
    
    auction.currentBid.price = data.bidAmount;
    auction.currentBid.name = data.bidderName;

    io.to(roomName).emit ('updated bid', {bidderName:data.bidderName, bidAmount:data.bidAmount})
    updateBid(auction.id, auction.currentBid.name, auction.currentBid.price);
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.get('/api/auctions', (req, res) => {
  res.json(data.auctions);
});

app.get('/api/auctions/:id', (req, res) => {
  res.json(data.auctions.filter((auction) => auction.id === req.params.id)[0]);
});


// Start the server
data.Init();
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

