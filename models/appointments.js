import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoctor',
        required: [true, 'The Doctor is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    date: {
        type: Date,
        required: [true, 'The date is required']
    },
    time: {
        type: String,
        required: [true, 'The time is required']
    },
    status: {
        type: Boolean,
        default: true
    }
})

appointmentSchema.methods.toJSON = function (){
    const { __v,status, ...data } = this.toObject();
    return data;
}

const appoinmenModel = mongoose.model('Appointment', appointmentSchema);
export default appoinmenModel;

