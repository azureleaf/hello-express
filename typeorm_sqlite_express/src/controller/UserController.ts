import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

// controller内部のどのactionもPromise objectを返していることに留意
export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    this.userRepository.find({ relations: ["office"] }).then(users => {
      response.render("user_list", { title: "メンバー一覧", users: users });
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
