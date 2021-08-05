/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import Author from './../db/models/author.entity';
import { DeleteResult } from 'typeorm';
import { AuthorsService } from './authors.service';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authors Endpoints')
@Controller('authors')
export class AuthorsController {
    constructor(
        private authorService: AuthorsService
        ) {}
    
    @Get()
    @ApiOperation({summary: 'Returns all authors'})
    @ApiResponse({ status: 201, description: 'Succesful return'})
    async getAll() : Promise<Author[]>{
        try{
            return this.authorService.getAllAuthors();
        }catch(e) {
            throw new HttpException(e,500);
        }
    }

    @Get(':id')
    @ApiParam({name: 'id', description: 'Author ID to be searched'})
    @ApiOperation({summary: 'Returns an author by its ID'})
    @ApiResponse({ status: 201, description: 'Succesful return'})
    async getAuthorByID(@Param('id') id: number) : Promise<Author>{
        try{
            return this.authorService.getAuthorById(id);
        }catch(e) {
            throw new HttpException(e,500);
        }
    }

    @Post('/createAuthor')
    @ApiOperation({summary: 'Creates an author'})
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async create(@Body() author: Author) : Promise<Author> {
        try{
            return this.authorService.createAuthor(author);
        }catch (e) {
            throw new HttpException(e,500);
        } 
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletes an author'})
    @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 500, description: 'Internal server error.'})
    async deleteAuthor(@Param('id') id: number): Promise<boolean>{
        try{
            return this.authorService.deleteAuthor(id);
        }catch(e){
            throw new HttpException(e,500);
        }
    }
}
