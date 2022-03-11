import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Users } from './Users';

@Entity('users_token')
export class UsersToken {
  @PrimaryColumn()
  id!: string;

  @Column()
  refresh_token!: string;

  @Column()
  user_id!: string;

  @ManyToOne(()=> Users)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @Column()
  expires_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  constructor(){
    if (!this.id) {
        this.id = uuidv4()
    }
  }
}
