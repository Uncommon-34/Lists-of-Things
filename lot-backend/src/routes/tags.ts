import { Router, Request, Response } from "express";

const tags_router = Router();

tags_router.post("/get-all", async (req: Request, res: Response) => {});

tags_router.post("/get-one", async (req: Request, res: Response) => {});

tags_router.post("/create", async (req: Request, res: Response) => {});

tags_router.post("/edit", async (req: Request, res: Response) => {});

export default tags_router;
