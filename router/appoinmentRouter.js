import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import {ValidarJwt} from '../middlewares/validar-jwt.js';
import {isDoctorExist} from '../middlewares/validateDoctor.js';
import {createAppoinment,getAllAppoinments,getAppoinmentsById,updateAppoinment,deleteAppoinment} from '../controllers/appoinmentController.js';
import {isValidDateFormat,isValidTimeFormat} from '../middlewares/validateTime.js';



const router = Router();

router.post('/', [
    ValidarJwt,
    check("description", "The name of the category is required").not().isEmpty(),
    check("date", "Invalid date format").custom(isValidDateFormat),
    check("time", "Invalid time format").custom(isValidTimeFormat),
    check("doctor", "The name of the category is required").not().isEmpty(),
    check("doctor").custom(isDoctorExist),
    validateFields
], createAppoinment);

router.get('/', getAllAppoinments);

router.get('/:id',[
    check("id", "The id is not valid").isMongoId(),
    validateFields
], getAppoinmentsById);


router.patch('/:id',[
    check("id", "The id is not valid").isMongoId(),
    check("description", "The name of the category is required").not().isEmpty(),
    check("doctor", "The name of the category is required").not().isEmpty(),
    check("doctor").custom(isDoctorExist),
    validateFields
],updateAppoinment)

router.delete('/:id',[
    check("id", "The id is not valid").isMongoId(),
    check("doctor", "The name of the category is required").not().isEmpty(),
    check("doctor").custom(isDoctorExist),
    validateFields
],deleteAppoinment)

export default router