import mongoose from "mongoose";
import User from "./user";
import Intel from "./intel";
import Company from "./company";
import Integration from "./integration";
import Entity from "./entity";

enum Database {
  user = "user",
  intel = "intel",
  company = "company",
  integration = "integration",
  entity = "entity",
}

const DatabaseSchemaMap = {
  [Database.user]: { schema: User, modelName: "User" },
  [Database.intel]: { schema: Intel, modelName: "Intel" },
  [Database.company]: { schema: Company, modelName: "Company" },
  [Database.integration]: { schema: Integration, modelName: "Integration" },
  [Database.entity]: { schema: Entity, modelName: "Entity" },
};

let isConnected = false; // track the connection

const connectToDB = async ({ dbName }: { dbName: Database }) => {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", true);

  const getDBModel = (dbName: Database) => {
    const { modelName, schema } = DatabaseSchemaMap[dbName] || {};
    const db = mongoose.connection.useDb(dbName);

    if (!db || !modelName || !schema) return null;

    // Need to register models every time a new connection is created
    if (!db.models[modelName]) {
      db.model(modelName, schema);
    }

    return db.model(modelName) as mongoose.Model<typeof schema>;
  };

  if (isConnected) {
    console.log("MongoDB is already connected");
    return getDBModel(dbName);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      // @ts-ignore
      useNewUrlParser: true,
      // @ts-ignore
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");

    return getDBModel(dbName);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export { Database, connectToDB };
