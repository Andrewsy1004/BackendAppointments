import DoctorsModel from '../models/doctors.js';

export const isDoctorExist = async (name) => {
    const exist = await DoctorsModel.findOne({ name });
    if (!exist)   throw new Error(`the doctor ${name} does not exist`);
    return exist;
}