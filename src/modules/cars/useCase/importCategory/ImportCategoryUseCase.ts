import { parse } from "csv-parse"
import fs from "fs"
import { CategoryRepository } from "../../repositories/Category"
import { IImportCategory } from "../../interface/IImportCategory"
import { inject, injectable } from "tsyringe"

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository
  ) {}
  loadCategorys(file: Express.Multer.File): Promise<IImportCategory[]>{
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []
      const parseFile = parse()
      
      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        const [name, description] = line
        categories.push({
          name,
          description,
        })
      })
      .on('end', () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      })
      .on('error', (e) => {
        reject(e)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategorys(file)

    categories.map((category) => {
      const { name, description } = category
      const existCategory = this.categoryRepository.findByName(name)

      if(!existCategory){
        this.categoryRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
