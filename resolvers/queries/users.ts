import User from "../../models/users";

export default {
  getUser: async (_: any, args: any) => {
    const userName = args.name;
    const password = args.password;

    try {
      const user = await User.findOne({ name: userName });
      if (!user) {
        throw new Error("User does not exist");
      }
      if (user.password !== password) {
        throw new Error("Password Incorrect");
      }
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  getAuthorisedUsers: async (_: any, args: any) => {
    const userId = args._id;

    try {
      const authorizedUsers: any = await User.findById(userId);

      return authorizedUsers.authorized.sort(
        (a: any, b: any) => a.name - b.name
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  getUserSearch: async (_: any, args: any) => {
    const searchString = args.searchString;

    try {
      const searchedUsers = await User.find({
        $in: [
          { name: { $regex: searchString } },
          { title: { $regex: searchString } },
        ],
      }).sort({ name: -1 });

      return searchedUsers;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
