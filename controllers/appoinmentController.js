import appoinmenModel from "../models/appointments.js";
import DoctorsModel from "../models/doctors.js";

export const createAppoinment = async (req, res) => {
    try{         
       const { date, time,doctor, description} = req.body;

       const existingAppointment = await appoinmenModel.findOne({ date, time });
       
       if(!!existingAppointment) return res.status(400).json({ msg: "there is no time available" });
       
       
       const appoDoctor = await DoctorsModel.findOne({ name: doctor });
       
       const data = {
         user: req.usuario._id,
         doctor: appoDoctor._id,
         description,
         date,
         time
       }
       
       const newAppoinment = new appoinmenModel(data);
       await newAppoinment.save();
       res.status(200).json(newAppoinment);
       
               
    } catch (err) {
        res.status(500).json(err);
    }
}


export const getAllAppoinments = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };

  try {
      const [total, appointments] = await Promise.all([
          appoinmenModel.countDocuments(query),
          appoinmenModel.find(query)
              .populate({
                  path: 'user'
              })
              .populate({
                  path: 'doctor'
              })
              .skip(Number(desde))
              .limit(Number(limite))
      ]);

     
      const formattedAppointments = appointments.map(appointment => {
          return {
              ...appointment._doc,
              user:   { name: appointment.user.name, email: appointment.user.email },  
              doctor: { name: appointment.doctor.name } 
          };
      });

      res.json({
          total,
          appointments: formattedAppointments
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Something went wrong' });

  }
};


export const getAppoinmentsById = async (req, res) => {
  try{
     const {id} = req.params;

     const appoinment = await appoinmenModel.findById(id)
        .populate({
            path: 'user'
        })
        .populate({
            path: 'doctor'
        })
     
      const formattedAppoinment = {
          ...appoinment._doc,
          user:   { name: appoinment.user.name, email: appoinment.user.email },  
          doctor: { name: appoinment.doctor.name } 
      }
      
      res.json(formattedAppoinment);
      
  }catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}

export const updateAppoinment = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const appoinment = await appoinmenModel.findByIdAndUpdate(id, { description }, { new: true });
        if(appoinment === null) return res.status(404).json({ msg: 'Appoinment not found' });
        res.json({msg: 'Appoinment updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

export const deleteAppoinment = async (req, res) => {
    try {
        const { id } = req.params;
        const appoinment = await appoinmenModel.findByIdAndUpdate(id, { status: false }, { new: true });
        if(appoinment === null) return res.status(404).json({ msg: 'Appoinment not found' });
        res.json({msg: 'Appoinment deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}