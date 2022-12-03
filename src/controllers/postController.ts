import { Request, Response, NextFunction } from "express";

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = [{ id: 1, title: "ts server", content: "server structure" }];
    res.json({ data: posts });
  } catch (err) {
    next(err);
  }
}
