import express from 'express';

import { getUsers, createUser, findUser, loginUser, logoutUser} from '../controllers/user.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/', findUser);
router.post('/login', loginUser);
router.post('/create', createUser);
router.post('/logout', logoutUser);

export default router