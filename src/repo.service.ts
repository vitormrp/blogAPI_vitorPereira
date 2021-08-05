import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Author from './db/models/author.entity';
import BlogPost from './db/models/posts.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepo: Repository<Author>,
    @InjectRepository(BlogPost) public readonly postRepo: Repository<BlogPost>,
  ) {}
}

export default RepoService;