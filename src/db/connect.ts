import { MongoClient } from "mongodb";
const mongo_uri = process.env.DB_URL;

class Connection {
  private static db: MongoClient | null = null;

  static async open() {
    if (this.db) return this.db;

    if (!mongo_uri) {
      throw new Error("Missing DB URL")
    }

    this.db = await new MongoClient(mongo_uri).connect();
    return this.db
  }
}

export default Connection