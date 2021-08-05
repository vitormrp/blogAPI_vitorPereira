import { AuthorsService } from './authors.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from 'src/repo.service';
import Author from 'src/db/models/author.entity';
import { Repository } from 'typeorm';
import RepoModule from 'src/repo.module';

@Module({
    imports: [],
    controllers: [AuthorsController],
    providers: [AuthorsService],
})
export class AuthorsModule { }
