import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";

export class IndexController {
  async show(request: Request, response: Response, next: NextFunction) {
    response.render("index", { title: "Index Page" });
  }
}
