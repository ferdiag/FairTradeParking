const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

const bookingSlots = async (req, res) => {
  let client, eventCollection;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/tradefair', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('tradefair');
    eventCollection = db.collection('events');
  } catch {
    res.send({ result: 'error' });
    client.close();
  }
  const id = req.body.orders[0].eventId; //muss noch verändert werden, falls der Kunde slots bei mehreren Events bucht
  try {
    const event = await eventCollection.findOne({
      _id: ObjectId(`${id}`),
    });
    const filter = { _id: ObjectId(`${id}`) };
    let currentlyOccupiedSlots = [];

    if (event.bookedSlots) {
      currentlyOccupiedSlots = event.bookedSlots;
    }

    let occupiedSlots = currentlyOccupiedSlots.concat(req.body.orders);

    let updateDoc;
    updateDoc = {
      $set: {
        bookedSlots: occupiedSlots,
      },
    };
    try {
      const options = { upsert: true, new: true };
      await eventCollection.updateOne(filter, updateDoc, options);
      const allEvents = await eventCollection.find({}).toArray();
      res.send({ allEvents });
    } catch (err) {
      res.send({ result: 'error' });
      client.close();
    }
  } catch {
    res.send({ result: 'error' });
    client.close();
  }
};

module.exports = bookingSlots;
