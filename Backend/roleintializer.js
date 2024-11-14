// scripts/initializeRoles.js
const mongoose = require("mongoose");

const initializeRoles = async () => {
  try {
    const roles = [
      { name: "Manager", description: "Manager role" },
      { name: "Sponsor", description: "Sponsor role" },
      { name: "Member", description: "Default user role" },
    ];

    for (const roleData of roles) {
      const role = await Role.findOne({ name: roleData.name });
      if (!role) {
        await Role.create(roleData);
        console.log(`Role ${roleData.name} created`);
      }
    }

    console.log("Roles initialization completed");
  } catch (error) {
    console.error("Error initializing roles:", error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    initializeRoles();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
