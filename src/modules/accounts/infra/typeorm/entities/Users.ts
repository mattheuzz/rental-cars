import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { Expose } from 'class-transformer'

@Entity("users")
export class Users {
  @PrimaryColumn()
  id?: string

  @Column()
  name!: string

  @Column()
  avatar!: string

  @Column()
  password!: string

  @Column()
  email!: string

  @Column()
  driver_license!: string

  @Column()
  admin: boolean = false

  @CreateDateColumn()
  created_at!: Date

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    switch(process.env.disk){
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`
      case "S3":
        return `${process.env.URL_IMAGE}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  constructor(){
    if (!this.id) {
        this.id = uuidv4()
    }
  }
}