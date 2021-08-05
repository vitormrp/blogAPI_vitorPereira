import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import Post from './posts.entity';
  
  @Entity({ name: 'authors' })
  export default class Author {
  
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    birthday: Date;

    @ApiProperty()
    @Column()
    nickname: string;
  
    @ApiProperty()
    @CreateDateColumn()
    creationDate: Date;
  
    @ApiProperty()
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
  
    // Associations
    @OneToMany(() => Post, post => post.authorConnection)
    postConnection: Promise<Post[]>;
  
  }