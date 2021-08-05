/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import Author from 'src/db/models/author.entity';
import Post from './../db/models/posts.entity';
import RepoService from './../repo.service';
import { MoreThan } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(private repoService: RepoService) {}
    
    async getAllPosts(){
        return await this.repoService.postRepo.find();
    }

    async getPostById(id: number){
        return await this.repoService.postRepo.findOne(id);
    }

    async getPostFilter(authorID?: number, date?: string){
        let newDate = new Date(date);
        if(date && authorID){
            console.log(newDate);
            return await this.repoService.postRepo.find(
                {
                    where: {authorId: authorID, createdAt: MoreThan(newDate)}
                }
            )
        }else if(authorID && !date){
            return await this.repoService.postRepo.find(
                {
                    where: {authorId: authorID}
                }
            )
        }else if(!authorID && date){
            return await this.repoService.postRepo.find(
                {
                    where: {createdAt: MoreThan(newDate)}
                }
            )
        }else{
            return await this.getAllPosts();
        }
    }

    async createPost(post: Post, idAuthor: number){
        const validAuthor = await this.repoService.authorRepo.findOne(idAuthor);
        if(validAuthor){
            post.authorId = idAuthor;
            const res = await this.repoService.postRepo.save(post);
            return res;
        }else{
            console.log('Invalid Author.')
            return null;
        }
    }

    async deletePost(id: number){
        const post = await this.repoService.postRepo.findOne(id);
        if(post){
            const deleted = await this.repoService.postRepo.delete(id);
            return true;
        }else{
            return false;
        }
    }
 }
