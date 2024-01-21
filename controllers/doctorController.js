import DoctorsModel from '../models/doctors.js';


export const createUserDoctor = async(req, res) => {
    const {name}  = req.body;
    const newUser = new DoctorsModel({name}); 

    await newUser.save();
    
    res.status(200).json({
        ok: true,
        uid: newUser.id,
        name: newUser.name,
    })
}


export const getAllTheUsersDoctors = async(req, res) => {
    const {limit=3 , offset=0} = req.query; 

    const [total, users] = await Promise.all([
        DoctorsModel.countDocuments({estado: true}),
        DoctorsModel.find({estado: true})
          .skip(Number(offset))
          .limit(Number(limit)),
    ])

   res.status(200).json({
       total,
       users 
   });
};