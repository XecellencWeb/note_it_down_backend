import { gql } from "apollo-server";


const taskDefinitions = gql`

                type TaskInstance{
                    name: String
                    description: String
                    picture:String
                }

                type Tasks {
                    _id: ID!
                    name: String!
                    description:String!
                    createdBy: ID!
                    tasks:[TaskInstance]!
                }


                
                input TaskInstanceInput{
                    name: String
                    description: String
                    picture:String

                }

                input TasksInput{
                    name: String
                    description:String
                    tasks:[TaskInstanceInput]
                }

`



export default taskDefinitions