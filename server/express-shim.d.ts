// ---------------------------------------------------------------------------------------------------------------------
// Custom type extensions
// ---------------------------------------------------------------------------------------------------------------------

// Models
import { Account } from "./models/account";

// ---------------------------------------------------------------------------------------------------------------------

declare global {
    export namespace Express {
        export interface User extends Account {}
        export interface Request {
            user?: User;
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------
