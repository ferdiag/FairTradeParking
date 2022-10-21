const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/router');
const schedule = require('node-schedule');
const MongoClient = require('mongodb').MongoClient;

// schedule.scheduleJob('* * * * *', async () => {
//   const client = await MongoClient.connect(
//     'mongodb://localhost:27017/tradefair',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
// const db = client.db('tradefair');
// const eventCollection = db.collection('events');
// const allEvents = await eventCollection.find({}).toArray();
// let allBookedSlots = [];

// for (const event of allEvents) {
//   allBookedSlots = allBookedSlots.concat(event.bookedSlots);
// }

// var date = new Date(Date.now());
// const currentDay = date.toISOString().split('T')[0]; //Formatierung vom Datum
// const hours = date.getHours();
// const minutes = date.getMinutes();

// for (let slot of allBookedSlots) {
//   const dateOfSlotSelected = new Date(slot.selectedDay);
//   const dateFormatted = dateOfSlotSelected.toISOString().split('T')[0]; //Formatierung vom Datum
//   console.log(dateFormatted, slot.endHour, slot.endMinutes);
// if (
//   currentDay === dateFormatted &&
//   hours === slot.endHour &&
//   minutes === slot.endMinutes
// ) {
//   console.log('send a message that slots expired');
// }
//   }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', router);
app.listen(4000, () => {
  console.log('listening on 4000');
});
