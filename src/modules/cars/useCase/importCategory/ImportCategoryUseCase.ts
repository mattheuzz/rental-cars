import { parse } from 'csv-parse'
import fs from 'fs'
import { CategoryRepository } from '../../repositories/Category'

class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  loadCategorys(file: Express.Multer.File):void{
    const stream = fs.createReadStream(file.path)

    const parseFile = parse()
    stream.pipe(parseFile)

    parseFile.on('data', async (line) => {
      console.log(line)
    })
  }

  execute(file: Express.Multer.File): void{
   
    

    console.log(file)
  }
}

export { ImportCategoryUseCase }
