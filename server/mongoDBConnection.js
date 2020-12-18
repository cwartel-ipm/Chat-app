const MongoClient = require("mongodb").MongoClient;
//const uri = `mongodb://chat:${process.env.mdbpass}@mysandbox-shard-00-00-gvmpk.mongodb.net:27017,mysandbox-shard-00-01-gvmpk.mongodb.net:27017,mysandbox-shard-00-02-gvmpk.mongodb.net:27017/test?ssl=true&replicaSet=MySandbox-shard-0&authSource=admin&retryWrites=true`;
const uri = `mongodb+srv://chat:${process.env.mdbpass}@cluster0.l00zr.mongodb.net/chat?retryWrites=true&w=majority`;
export const connectToMongoDB = async ({ dbName, collName }) => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    return client.db(dbName).collection(collName);
  } catch (err) {
    return err;
  }
};
