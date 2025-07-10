import { Router, Request, Response } from "express";

const lists_router = Router();

lists_router.post("/get-all", async (req: Request, res: Response) => {});

lists_router.post("/get-one", async (req: Request, res: Response) => {});

lists_router.post("/create", async (req: Request, res: Response) => {});

lists_router.post("/edit", async (req: Request, res: Response) => {});

export default lists_router;
