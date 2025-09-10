import { Prisma } from "@prisma/client";

export class Users{
    id: number
    name: string;
    email: string; // Make description required
    password: string;
   
}
