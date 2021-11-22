import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
class CreateCategoryController {
  constructor(private criateCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        error: "Name and description are required",
      });
    }
    this.criateCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
