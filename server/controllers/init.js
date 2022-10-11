const MongoClient = require('mongodb').MongoClient;

const init = async (req, res) => {
  console.log('init');
  const client = await MongoClient.connect(
    'mongodb://localhost:27017/tradefair',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db('tradefair');
  const eventCollection = db.collection('events');
  // await eventCollection.deleteMany();
  const allEvents = await eventCollection.find({}).toArray();

  console.log(allEvents);
  res.send({ allEvents });
};
module.exports = init;
