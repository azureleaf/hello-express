import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Office } from "../entity/Office";

export class OfficeController {
  private officeRepository = getRepository(Office);

  async all(request: Request, response: Response, next: NextFunction) {
    const officesPromise = this.officeRepository.find();
    officesPromise.then(offices => {
      response.render("office_list", {title: "事業所一覧", offices: offices});
    });
  }
}
