import axios from "axios";

const registerManager = async () => {
  console.log("Starting registration process...");
  try {
    const response = await axios.post("http://localhost:3000/auth/register", {
      firstName: "ManagerFirstName",
      lastName: "ManagerLastName",
      email: "manager@example.com",
      password: "password123",
      role: "Manager",
    });
    console.log("Manager registered successfully:", response.data);
  } catch (error) {
    console.error("Error registering manager:", error);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

registerManager();
