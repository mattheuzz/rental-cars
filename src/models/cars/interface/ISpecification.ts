interface ICreationSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  
  create({ name, description }: ICreationSpecificationDTO): void
}

export { ISpecificationsRepository, ICreationSpecificationDTO }
