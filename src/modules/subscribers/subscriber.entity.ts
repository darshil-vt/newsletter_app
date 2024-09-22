import { Organization } from 'src/modules/organization/organization.entity';
import { v4 as uuid } from 'uuid';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('subscribers')
  export class Subscriber {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar' })
    email: string;
  
    @Column({type: 'text'})
    gpg_public_key: string;

    @Column({ type: 'jsonb', nullable: true})
    custom_fields: Record<string,any>;

    @Column('uuid')
    organization_id: string;

    @ManyToOne(()=> Organization, { eager: false })
    @JoinColumn({name: 'organization_id'})
    organization: Organization
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    constructor() {
        this.id = uuid();
      }
  }
  