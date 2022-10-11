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
  const id = req.body.orders[0]._id;
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
  } catch {
    res.send({ result: 'error' });
    client.close();
  }

  try {
    const options = { upsert: true, new: true };
    await eventCollection.updateOne(filter, updateDoc, options);
  } catch (err) {
    res.send({ result: 'error' });
    client.close();
  }
};

module.exports = bookingSlots;
