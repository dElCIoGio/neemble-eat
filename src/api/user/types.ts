import {Role} from "@/schema.ts";

export type createUserProps = {
    UUID: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: Role;
}