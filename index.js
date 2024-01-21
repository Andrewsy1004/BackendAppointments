import Express from 'express';
import cors from 'cors';
import {dbConnection} from './database/config.js';

import userRoute from './router/userRouter.js';
import userDoctorRoute from './router/doctorRouter.js';
import appointementsRoute from './router/appoinmentRouter.js';


import 'dotenv/config';

const app = Express();
const PORT = process.env.PORT || 3000;

dbConnection();

app.get('/', (req, res) => {
    res.send('Hello developer!!!');
})

app.use(cors());
app.use(Express.json());


app.use('/api/auth', userRoute);
app.use('/api/doctor', userDoctorRoute);
app.use('/api/appoinment', appointementsRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});