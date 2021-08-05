import { Injectable } from '@nestjs/common';
import RepoService from './repo.service';

@Injectable()
export class AppService {
  getHello(): string { // querying database
    return 'Hello World!';
  }
}