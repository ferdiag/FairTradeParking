// const MongoClient = require('mongodb').MongoClient;
var QRCode = require('qrcode');
const createQrCode = async (req, res) => {
  const text = req.body.text;
  const id = req.body.id;

  QRCode.toFile(`documents/${id}.png`, text, {
    color: {
      quality: 1,
      dark: '#000',
      light: '#FFF',
    },
  });
  //   const client = await MongoClient.connect('mongodb://localhost/User');
  //   const db = client.db();
  //   const usersCollection = db.collection('users');
  //   // const allUsers = await usersCollection.deleteMany({});
  //   const allUsers = await usersCollection.find().toArray();
  //   const allNfts = handleGetAllNfts(allUsers);
  //   const allNftsOnTheMarket = allNfts.filter((nft) => nft.isSale);
  //   console.log(allNfts);
  //   res.status(200).json({ allNfts: allNftsOnTheMarket });
};
module.exports = createQrCode;
