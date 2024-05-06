const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Permission name is required"],
    unique: true,
  },
  PermissionStatus: {
    permission_name: String,
    permission_value: [Number], // 0 = no access, 1 = read, 2 = write, 3 = read/write
  },
});

const Permission = mongoose.model("Permission", PermissionSchema);
