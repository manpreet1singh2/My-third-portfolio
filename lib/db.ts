import { MongoClient } from "mongodb"

// Use a default value for development if environment variable is not set
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "portfolio"

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no cached connection, create a new one
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to database:", error)

    // Return mock data for development if database connection fails
    if (process.env.NODE_ENV !== "production") {
      console.log("Using mock data for development")
      return {
        client: null,
        db: {
          collection: (name: string) => ({
            find: () => ({ toArray: () => [] }),
            findOne: () => null,
            insertOne: () => ({ insertedId: "mock-id" }),
            insertMany: () => ({ insertedIds: ["mock-id-1", "mock-id-2"] }),
            updateOne: () => ({ modifiedCount: 1 }),
            deleteOne: () => ({ deletedCount: 1 }),
          }),
        },
      }
    }

    throw error
  }
}
