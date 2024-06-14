// src/@types/express/index.d.ts
declare namespace Express {
  export interface User {
    id: number;
    role: string;
  }

  export interface Request {
    user?: User;
  }
}
