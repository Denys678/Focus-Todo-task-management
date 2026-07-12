import { z } from "zod";

export const authCredentialsSchema = z.strictObject({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const registerSchema = authCredentialsSchema;
export const loginSchema = authCredentialsSchema;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;