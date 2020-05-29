const SimpleODM = require('./exp');

const odm = new SimpleODM();

// const connect = async () => {
//   await odm.connect('mongodb://localhost:27017');
//   //   console.log('Connected');
// };

// const func = async () => {
//   return await odm.getDatabase('video');
// };

// const close = async () => {
//   return await odm.closeConnection();
//   //   console.log('connection closeed');
// };

// const test = async () => {
//   await connect();
//   console.log('connected!!');

//   console.log(await func());
//   await close();
//   console.log('connection closed');
// };

// test();

const connect = () => {
  return odm.connect('mongodb://localhost:27017');
  //   console.log('Connected');
};

const func = () => {
  return odm.getDatabase('video');
};

const close = () => {
  return odm.closeConnection();
  //   console.log('connection closeed');
};

const test = async () => {
  await connect();
  console.log('connected!!');

  //console.log(await func());
  const db = await func();
  console.log(await db.collection('movies').countDocuments());
  await close();
  console.log('connection closed');
};

test();
