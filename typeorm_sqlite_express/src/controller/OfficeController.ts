import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Office} from "../entity/Office";

export class OfficeController {

    private officeRepository = getRepository(Office);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.officeRepository.find();
    }

}