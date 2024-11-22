export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!regex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return "";
};

export const validateName = (name, fieldName) => {
  if (!name) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  if (!/^[a-zA-Z\s]*$/.test(name))
    return `${fieldName} must contain only letters`;
  return "";
};

export const validateEventFields = (event) => {
  const errors = {};

  if (!event.title) errors.title = "Title is required";
  if (!event.description) errors.description = "Description is required";
  if (!event.date) errors.date = "Date is required";
  if (!event.time) errors.time = "Time is required";
  if (!event.location) errors.location = "Location is required";
  if (!event.category) errors.category = "Category is required";

  if (event.date) {
    const eventDate = new Date(`${event.date} ${event.time}`);
    if (eventDate < new Date()) {
      errors.date = "Event date cannot be in the past";
    }
  }

  return errors;
};
