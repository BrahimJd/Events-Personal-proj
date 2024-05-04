const initializeRoles = async () => {
  try {
    const managerRole = await Role.findOne({ name: "Manager" });
    if (!managerRole) {
      await Role.create({
        name: "Manager",
        description: "Manager role",
        permissions: ["manageEvents", "manageUsers", "manageNews"],
      });
    }
    const sponsorRole = await Role.findOne({ name: "Sponsor" });
    if (!sponsorRole) {
      await Role.create({
        name: "Sponsor",
        description: "Sponsor role",
        permissions: ["requestEvents"],
      });
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};
