import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const users = await User.find({ profilePicture: { $exists: true } });

for (const user of users) {
  if (user.profilePicture && user.profilePicture !== "") {
    user.profilePic = user.profilePicture;
  }
  delete user._doc.profilePicture; // remove it from the returned doc
  await User.updateOne({ _id: user._id }, {
    $set: { profilePic: user.profilePicture || "" },
    $unset: { profilePicture: "" }
  });
  console.log(`✅ Migrated: ${user.email}`);
}

console.log("✅ Migration complete.");
mongoose.disconnect();
