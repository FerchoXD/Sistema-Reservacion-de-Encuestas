export interface CredentialInterface {
    password: string;
    token: string;
    constructor(password: string): void;
    ///hashPassword(): Promise<void>;
}