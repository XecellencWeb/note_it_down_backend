import { gql } from "apollo-server";

const userDefinition = gql`
  type Users {
    _id: ID!
    name: String!
    picture:String!
    gender:String
    title: String!
    numberOfTaskCreared:Float
    
  }

  input UsersInput {
    name: String
    email: String
    password: String
    title: String
    _id: ID
  }
`;

export default userDefinition;
