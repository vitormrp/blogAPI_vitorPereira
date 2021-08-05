import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Author from './db/models/author.entity';
import Post from './db/models/posts.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Author,Post,]),],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}
export default RepoModule;