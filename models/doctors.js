import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    estado : {
        type: Boolean,
        default: true,
    }
})

const DoctorsModel = mongoose.model('UserDoctor', UserSchema);
export default DoctorsModel;