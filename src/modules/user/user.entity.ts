import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Organization } from 'src/modules/organization/organization.entity';

export enum UserRole {
    SUPERADMIN = 'Superadmin',
    ADMIN = 'Admin',
    USER = 'User'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password_hash: string;

    @Column('uuid')
    organization_id: string;

    @ManyToOne(()=> Organization, { eager: false })
    @JoinColumn({name: 'organization_id'})
    organization: Organization
  

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
      })
      role: UserRole;
    
      @CreateDateColumn({ type: 'timestamp' })
      created_at: Date;
    
      @UpdateDateColumn({ type: 'timestamp' })
      updated_at: Date;
    
      constructor() {
        this.id = uuid();
      }
    
}