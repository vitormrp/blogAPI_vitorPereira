/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import Author from 'src/db/models/author.entity';
import RepoService from './../repo.service';

@Injectable()
export class AuthorsService { 
    constructor(private repoService: RepoService) {}
    
    async getAllAuthors(){
        return await this.repoService.authorRepo.find();
    }

    async getAuthorById(id: number){
        return await this.repoService.authorRepo.findOne(id);
    }

    async createAuthor(author: Author){
        const res = await this.repoService.authorRepo.save(author);
        return res;
    }

    async deleteAuthor(id: number){
        const author = await this.repoService.authorRepo.findOne(id);
        if(author){
            const deleted = await this.repoService.authorRepo.delete(author.id);
            return true;
        }else{
            return false;
        }
    }
}
