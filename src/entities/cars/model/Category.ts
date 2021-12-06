import { v4 as uuidv4 } from 'uuid'

class Category{
    name: string
    id?: string
    description: string
    created_at: Date

    constructor(){
        if (!this.id) {
            this.id = uuidv4()
        }
        this.created_at = new Date()
    }
}

export { Category }

