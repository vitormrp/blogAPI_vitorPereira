import { PostsService } from './posts.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './../repo.service';
import BlogPost from './../db/models/posts.entity';

@Module({
    imports: [],
    controllers: [PostsController],
    providers: [PostsService,],
})
export class PostsModule { }
