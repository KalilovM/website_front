import {z} from "zod";

export const LoginSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(6).max(20),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;


export interface Tokens {
  access: string;
  refresh: string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  tokens: Tokens;
}

