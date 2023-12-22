import Task from "../../models/task"

export default {
    getTasks:async(_:any,args:any)=>{
        const createdBy = args.createdBy

        try {
            const tasks = Task.find({createdBy})

            return tasks
        } catch (err:any) {
            throw new Error(err.message)
        }
    }
}