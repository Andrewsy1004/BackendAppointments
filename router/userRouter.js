import { Router } from 'express';
import { check } from 'express-validator';

import {createUser,login,getAllTheUsers} from '../controllers/userController.js';
import { validateFields } from '../middlewares/validate-fields.js';
import {isEmailExist} from '../helpers/validationInputs.js';


const router = Router();


router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').isLength({min: 6}),
    check('email', 'Email is required').isEmail(),
    check("email").custom(isEmailExist),
    validateFields
], createUser);

router.post('/login',[
    check('password', 'Password is required').isLength({min: 6}),
    check('email', 'Email is required').isEmail(),
    validateFields
],login )

router.get('/', getAllTheUsers);


export default router;