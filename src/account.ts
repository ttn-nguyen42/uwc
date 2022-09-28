export enum Role {
    Janitor,
    Collector,
    Admin,
}

export const Accounts: Account[] = [
    {
        name: "John Doe",
        username: "janitor01",
        password: "password",
        role: Role.Janitor,
    },
    {
        name: "John Smith",
        username: "collector01",
        password: "password",
        role: Role.Collector,
    },
    {
        name: "Jane Doe",
        username: "admin01",
        password: "password",
        role: Role.Admin,
    }
];

export interface Account {
    name: string;
    username: string;
    password: string;
    role: Role;
}


