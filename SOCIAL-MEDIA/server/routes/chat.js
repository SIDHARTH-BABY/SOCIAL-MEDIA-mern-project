import express from 'express';  
import {login} from '../controllers/auth.js'
import { createChat, findChat, userChats } from '../controllers/chat.js';

const router =express.Router();


router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

export default router