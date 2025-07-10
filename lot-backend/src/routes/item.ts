import { Router, Request, Response } from "express";

const item_router = Router();

item_router.post("/get-all", async (req: Request, res: Response) => {});

item_router.post("/get-one", async (req: Request, res: Response) => {});

item_router.post("/create", async (req: Request, res: Response) => {});

item_router.post("/edit", async (req: Request, res: Response) => {});

export default item_router;
