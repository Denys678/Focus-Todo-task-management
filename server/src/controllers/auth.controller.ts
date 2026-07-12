import type { RequestHandler } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import type { RegisterInput, LoginInput } from "../schemas/auth.schema";

export const register: RequestHandler = async (req, res) => {
    const data = req.body as RegisterInput;

    const user = await registerUser(data);

    res.status(201).json({
        user,
    });
};

export const login: RequestHandler = async (req, res) => {
    const data = req.body as LoginInput;

    const result = await loginUser(data);

    res.status(200).json(result);
};