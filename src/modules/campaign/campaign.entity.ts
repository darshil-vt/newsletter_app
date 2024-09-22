import { v4 as uuid } from 'uuid';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { List } from '../lists/list.entity';
import { Organization } from '../organization/organization.entity';
  
  @Entity('campaigns')
  export class Campaign {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar' })
    subject: string;
  
    @Column({ type: 'text' })
    content: string;

    @ManyToOne(()=> List)
    @JoinColumn({name: 'list_id'})
    list: List

    @Column('uuid')
    list_id: string;

    @ManyToOne(()=> Organization)
    @JoinColumn({name: 'organization_id'})
    organization: Organization

    @Column('uuid')
    organization_id: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    constructor() {
        this.id = uuid();
      }
  }
  