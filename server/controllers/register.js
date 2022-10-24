const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const register = async (req, res) => {
  const {
    namePartner,
    nameCompany,
    givenName,
    phone,
    eMail,
    street,
    zip,
    city,
    password,
  } = req.body;

  const saltRounds = 10;
  let hashedPassword;

  await bcrypt.hash(password, saltRounds, async (err, hash) => {
    let userCollection, client;
    try {
      hashedPassword = hash;

      client = await MongoClient.connect(
        'mongodb://localhost:27017/tradefair',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      const db = client.db('tradefair');
      userCollection = db.collection('user');
    } catch {
      res.send({ result: 'error' });
      return;
    }

    const user = {
      password: hash,
      namePartner,
      nameCompany,
      givenName,
      phone,
      eMail,
      street,
      zip,
      city,
      events: [],
    };
    if (!userCollection) {
      res.send({ result: 'error' });
      client.close();
      return;
    }
    await userCollection
      .insertOne(user)
      .then(() => res.status(200).json({ result: 'success' }))
      .catch((err) => console.log(err));
    client.close();
  });
};

module.exports = register;
