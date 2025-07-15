import { Router, Request, Response } from "express";

const user_router = Router();

user_router.post("/validate", async (req: Request, res: Response) => {});

user_router.post("/login", async (req: Request, res: Response) => {});

user_router.post("/create", async (req: Request, res: Response) => {});

user_router.post("/me", async (req: Request, res: Response) => {});

export default user_router;
