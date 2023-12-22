//queries import
import userQueries from './queries/users'
import tasksQueries from './queries/task'


//mutations import
import usersMutation from './mutations/users'
import tasksMutation from './mutations/tasks'


export default {
    Query:{
        ...userQueries,
        ...tasksQueries
    },
    Mutation:{
        ...usersMutation
        ,

        ...tasksMutation

       
    }
}