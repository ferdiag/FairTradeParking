const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const createEvent = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient.connect(
    'mongodb://localhost:27017/tradefair',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db('tradefair');
  const eventCollection = db.collection('events');
  const userCollection = db.collection('user');

  const event = {
    name: req.body.name,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    lengthOfSlot: req.body.lengthOfSlot,
    duration: req.body.duration,
    emailOfCreator: req.body.email,
    bookedSlots: [],
  };

  const resEventCollection = await eventCollection.insertOne(event);

  const user = await userCollection.findOne({ eMail: req.body.email });
  const eventFromDatabase = await eventCollection.findOne({
    _id: resEventCollection.insertedId,
  });

  const filter = { email: user.email };
  const updatedEvents = [...user.events, resEventCollection.insertedId];

  let updateDoc;
  updateDoc = {
    $set: {
      events: updatedEvents,
    },
  };
  const options = { upsert: true, new: true };

  await userCollection.updateOne(filter, updateDoc, options);
  const allUser = await userCollection.find({}).toArray();
  res.send({ event });
  //   .then(() => res.status(200).json({ result: 'success' }))
  //   .catch((err) => console.log(err));

  // res.send({ result: 'success' });
};
module.exports = createEvent;
