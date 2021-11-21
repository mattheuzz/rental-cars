import { v4 as uuidv4 } from 'uuid'

class Specification {
  name: string;
  id?: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.created_at = new Date();
  }
}

export { Specification };
