import { PostsModule } from './blogPosts/posts.module';
import { PostsController } from './blogPosts/posts.controller';
import { AuthorsModule } from './authors/authors.module';
import { AuthorsController } from './authors/authors.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';

import * as ormOptions from './config/orm';


@Module({
  imports: [PostsModule, AuthorsModule, TypeOrmModule.forRoot(ormOptions), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
