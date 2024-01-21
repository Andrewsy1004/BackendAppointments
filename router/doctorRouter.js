import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import {createUserDoctor,getAllTheUsersDoctors} from '../controllers/doctorController.js';

const router = Router();

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createUserDoctor);

router.get('/', getAllTheUsersDoctors);


export default router;