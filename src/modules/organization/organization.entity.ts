import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
    
    constructor() {
        this.id = uuid();
    }
    
}