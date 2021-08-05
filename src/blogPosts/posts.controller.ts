/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, Param, Post, Query} from '@nestjs/common';
import BlogPost from './../db/models/posts.entity';
import { PostsService } from './posts.service';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Posts Endpoints')
@Controller('posts')
export class PostsController {
    constructor(
        private postService: PostsService
        ) {}
    
    @Get()
    @ApiOperation({summary: 'Returns all posts'})
    @ApiResponse({ status: 201, description: 'Succesful return'})
    async getAll() : Promise<BlogPost[]>{
        try{
            return this.postService.getAllPosts();
        }catch(e) {
            throw new HttpException(e,500);
        }
    }

    @Get('/findPostsByFilter')
    @ApiParam({name: 'authorId', description: 'Author ID', required: false})
    @ApiParam({name: 'dateFilter', description: 'Date from which posts were posted', required: false})
    @ApiOperation({summary: 'Returns all posts that match the params'})
    @ApiResponse({ status: 201, description: 'Succesful return'})
    async getPostsFiltered(@Query('authorId') authorId?: number, @Query('dateFilter') dateFilter?: string): Promise<BlogPost[]>{
        try{
            return await this.postService.getPostFilter(authorId, dateFilter);
        }catch (e){
            throw new HttpException(e,500);
        }
    }

    @Get(':id')
    @ApiParam({name: 'id', description: 'Post ID to be searched'})
    @ApiOperation({summary: 'Returns a post by its ID'})
    @ApiResponse({ status: 201, description: 'Succesful return'})
    async getPostByID(@Param('id') id: number) : Promise<BlogPost>{
        try{
            return this.postService.getPostById(id);
        }catch(e) {
            throw new HttpException(e,500);
        }
    }


    @Post('/createPost/:authorId')
    @ApiOperation({summary: 'Creates an author'})
    @ApiParam({name: 'authorId', description: 'Post Author ID'})
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async createPost(@Param('authorId') authorId: number, @Body() post: BlogPost) : Promise<BlogPost> {
        try{
            return this.postService.createPost(post, authorId);
        }catch (e) {
            throw new HttpException(e,500);
        } 
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletes a post'})
    @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 500, description: 'Internal server error.'})
    async deletePost(@Param('id') id: number): Promise<boolean>{
        try{
            return this.postService.deletePost(id);
        }catch(e){
            throw new HttpException(e,500);
        }
    }
 }
