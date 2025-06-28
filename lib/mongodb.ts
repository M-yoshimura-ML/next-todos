import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const option = {};

let client;
let mongoDBClient: Promise<MongoClient>;

declare global {
    var _mongoCLientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URL must be defined');
}

if (process.env.NODE_ENV === 'development') {
    if(!global._mongoCLientPromise) {
        client = new MongoClient(uri, option);
        global._mongoCLientPromise = client.connect();
    }
    mongoDBClient = global._mongoCLientPromise;
} else {
    client = new MongoClient(uri, option);
    mongoDBClient = client.connect();
}

export default mongoDBClient;