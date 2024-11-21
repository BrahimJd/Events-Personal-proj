const { PermsSchema } = require("../Helpers/validation");
const Permission = require("../Modules/Permission");

// Add a new permission
const addPermission = async (req, res) => {
  try {
    const result = await PermsSchema.validateAsync(req.body);
    const permission = new Permission(result);
    const savedPermission = await permission.save();
    res.status(201).json({ permission: savedPermission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get permission
const getPermission = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Delete permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Update permission
const updatePermission = async (req, res) => {
  try {
    const { permission } = req.body;
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { permission },
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPermission,
  getPermission,
  deletePermission,
  updatePermission,
};
