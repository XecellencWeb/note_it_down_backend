import { model, models, Schema } from "mongoose"

const taskSchema = new Schema({
    name:String,
    description:String,
    createdBy:Schema.ObjectId,
    tasks:[{
        name:String,
        description:String,
        picture:String,
    }],
    createdAt:{
        type:Date,
        default:()=>(
            Date.now()
        ),
        immutable:true
    }
})


const Task = models.Tasks || model('Tasks',taskSchema)

export default Task