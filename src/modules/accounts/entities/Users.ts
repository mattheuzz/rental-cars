import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity("users")
export class Users {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  driver_license: string

  @Column()
  admin: boolean

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if (!this.id) {
        this.id = uuidv4()
    }
  }
}