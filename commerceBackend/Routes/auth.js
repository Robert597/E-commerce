import express from 'express';
import { handleSignIn, handleSignUp } from '../Controllers/authController.js';

let authRouter = express.Router();

authRouter.post('/signin', handleSignIn);
authRouter.post('/signup', handleSignUp);

export default authRouter;