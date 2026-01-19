import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { 
      type: String,
      required: true,
      unique: true,
    },

    email: { 
      type: String, 
      required: true, 
      unique: true 
    },

    password: { 
      type: String, 
      required: true 
    },

    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs=",
    },

    // ⭐ ADD THIS
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
