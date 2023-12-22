import mongoose from "mongoose";
import User from "../../models/users";

export default {
  createUser: async (_: any, args: any) => {
    const user = args.user;

    try {
      const userExist = await User.findOne({ name: user.name });
      if (userExist) {
        throw new Error("User already Exist. Please choose a different name");
      }
      const createdUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        ...user,
      });

      return createdUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  updateUser: async (_: any, args: any) => {
    const updateWith = args._with;
    const id = args.id;

    try {
      const updateUser: any = await User.findById(id);

      Object.entries(updateWith).forEach(([key, value]) => {
        updateUser[key] = value;
      });

      await updateUser.save();

      return updateUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  authorizeUser: async (_: any, args: any) => {
    const toAuthoriseUser = args.userId;
    const authorizingUser = args.authorisingId;

    try {
      const authorised = await User.findById(authorizingUser);
      authorised.authorized.id(toAuthoriseUser).authorized = true;

      await authorised.save();

      return "Authorization Completed";
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  requestUserAuthorizing: async (_: any, args: any) => {
    const user = args.user;
    const authorisedBy = args.authorisedBy;

    try {
      const authorising = await User.findById(authorisedBy);

      if (authorising.authorized.id(user._id)) {
        throw new Error("Your Request Has already been sent");
      }

      authorising.authorized.push({ ...user });

      await authorising.save();

      return "Authorization Requested";
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  cancelRequestUserAuthorizing: async (_: any, args: any) => {
    const toCancelRequestUser = args.userId;
    const authorizingUser = args.authorisingId;

    try {
      const authorised = await User.findById(authorizingUser);

      authorised.authorized.filter(
        //@ts-ignore
        (request) => request._id !== toCancelRequestUser
      );

      await authorised.save();

      return "User not Authorized";
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
