const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const login = async (req, res) => {
  const data = req.body;
  console.log(data);
  let client;
  let user;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/tradefair', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('tradefair');
    const userCollection = db.collection('user');
    user = await userCollection.findOne({ eMail: data.email });

    if (!user) {
      console.log('es gab keinen User');
      res.send('error');
      client.close();
      return;
    }
  } catch {
    res.send('error');
    client.close();
  }

  // await userCollection.deleteMany({});
  // const alluser = await userCollection.find({}).toArray();

  bcrypt.compare(data.password, user.password, (err, result) => {
    // result == true
    if (!result) {
      res.send({ result: 'error' });
      return;
    }
    if (result) {
      const userData = {
        name: user.namePartner,
        nameCompany: user.nameCompany,
        givenName: user.givenName,
        phone: user.phone,
        eMail: user.eMail,
        street: user.street,
        zip: user.zip,
        city: user.city,
        events: [],
      };
      res.send({ result: 'success', userData });
      client.close();
    }
  });
  // const accessToken = jwt.sign(
  //   { user: 'helmut' },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     expiresIn: '30s',
  //   }
  // );

  // //in die Datenbank eintragen und dann dem jeweiligen User hinzufügen
  // const refreshToken = jwt.sign(
  //   { user: 'helmut' },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   {
  //     expiresIn: '1d',
  //   }
  // );
  // res.cookie('jwt', refreshToken, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
};

module.exports = login;
