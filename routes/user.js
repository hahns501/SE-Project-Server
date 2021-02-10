import express from 'express';

import { getUsers, createUser, findUser, testAPI} from '../controllers/user.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/', findUser);
router.get('/test', testAPI);
router.post('/', createUser);

export default router