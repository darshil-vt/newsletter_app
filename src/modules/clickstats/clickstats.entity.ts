import { v4 as uuid } from 'uuid';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { Campaign } from 'src/modules/campaign/campaign.entity';
  
  @Entity('clickStats')
  export class ClickState {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar' })
    link: string;

    @Column('uuid')
    campaign_id: string;

    @ManyToOne(()=> Campaign)
    @JoinColumn({name: 'campaign_id'})
    campaign: Campaign;

    @Column()
    click_count: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    constructor() {
        this.id = uuid(); 
      }
  }
  