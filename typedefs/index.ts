import { gql } from "apollo-server";
import userDefinition from "./definitions/user";
import taskDefinitions from "./definitions/tasks";

const typeDefs = gql`
  type Query {
    getUser(name:String!,password:String!): Users!
    getAuthorisedUsers(_id: ID!): [Users]
    getUserSearch(searchString: String!): [Users]

    getTasks(createdBy: ID!): [Tasks!]!
  }

  type Mutation {
    createUser(user: UsersInput!): Users!
    updateUser(_with: UsersInput!, id: String!): Users!
    requestUserAuthorizing(user: UsersInput!, authorisedBy: ID!): String!
    cancelRequestUserAuthorizing(user: UsersInput!, authorisedBy: ID!): String!
    authorizeUser(userId: ID!, authorisingId: ID!): String!

    createTask(task: TasksInput!, userId: String!): Tasks!
    updateTask(taskId: ID!, task: TasksInput!): Tasks!
    deleteTask(taskId: ID!): String!
  }
`;

export default [userDefinition, taskDefinitions, typeDefs];
