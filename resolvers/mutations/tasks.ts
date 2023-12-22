import mongoose from "mongoose";
import Task from "../../models/task";

export default {
    createTask:async(_:any ,args:any)=>{
        const task = args.task;
        const userId = args.userId

        try {
            const createdTask = await Task.create({_id:new mongoose.Types.ObjectId,createdBy:userId,...task})

            return createdTask
        } catch (err:any) {
            throw new Error(err.message)
        }

    },
    updateTask:async(_:any,args:any)=>{
        const updateWith = args.task
        const id = args.taskId

        try {
            const updateTask:any = await Task.findById(id)

            Object.entries(updateWith).forEach(
                ([key,value])=>{
                    updateTask[key] = value
                }
            )

            await updateTask.save()

            return updateTask
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    },
    deleteTask:async(_:any,args:any)=>{
        const id = args.taskId

        try {
            await Task.findByIdAndDelete(id)


            return 'Task deleted Successfully'
        } catch (err:any) {


            throw new Error(err.message)
        }
    }
}