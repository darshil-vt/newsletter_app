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
  
  @Entity('lists')
  export class List {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'jsonb', nullable: true})
    custom_fields: Record<string,any>;

    @Column('uuid')
    organization_id: string;

    @ManyToOne(()=> Organization , { eager: false })
    @JoinColumn({name: 'organization_id'})
    organization: Organization
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    constructor() {
        this.id = uuid();
    }
  }
  