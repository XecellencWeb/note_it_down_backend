import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    unique: [true, "Username must be Unique"],
  },
  password: String,
  title: String,
  gender:String,
  picture:{
    type:String,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  },
  numberOfTaskCreated:{
    type:Number,
    default:0
  },
  authorized: {
    type: [
      {
        name: String,
        title: String,
        _id: Schema.ObjectId,
        authorized: {
          type: Boolean,
          default: false,
        },
        authorizedAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.Users || model("Users", UserSchema);

export default User;
