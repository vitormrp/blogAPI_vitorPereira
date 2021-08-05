import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column, OneToMany,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import Author from './author.entity';
  
  @Entity({name: 'posts'})
  export default class BlogPost {
  
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column()
    title: string;
  
    @ApiProperty()
    @Column({name: 'author_id'})
    authorId: number;

    @ApiProperty()
    @Column()
    body: string;
  
    @ApiProperty()
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @ApiProperty()
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
  
    // Associations
  
    @ManyToOne(() => Author, author => author.postConnection, {primary:
        true})
    @JoinColumn({name: 'author_id'})
    authorConnection: Promise<Author>;
  }
  