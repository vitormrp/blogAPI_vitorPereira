import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import RepoService from './../repo.service';
import Author from './../db/models/author.entity';
import TestUtil from './../shared/Test/test.util';
import { AuthorsService } from './authors.service';
import BlogPost from './../db/models/posts.entity';
import { DeleteResult } from 'typeorm';

describe('AuthorService', () => {
  let authorService: AuthorsService; 
  const mockRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
  };
  const mockRepoPost = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService,RepoService,
    {
        provide: getRepositoryToken(Author),
        useValue: mockRepo,
    },
    {
        provide: getRepositoryToken(BlogPost),
        useValue: mockRepoPost,
    }],
    }).compile();
  
   authorService = app.get<AuthorsService>(AuthorsService);
});

  beforeEach(() =>{
    mockRepo.find.mockReset();
    mockRepo.findOne.mockReset();
    mockRepo.save.mockReset();
    mockRepo.delete.mockReset();
  });  

  describe('getAllAuthors', () =>{
      it('should return all authors', async () => {
        //Mocking  
        const validAuthor = TestUtil.returnAuthor();
        mockRepo.find.mockReturnValue([validAuthor, validAuthor]);
        const authors = await authorService.getAllAuthors();
        
        //Asserting
        expect(authors).toHaveLength(2);
        expect(mockRepo.find).toHaveBeenCalledTimes(1);
       })
  })  
  
  describe('getAuthorByID', () =>{
    it('should return an specific Author', async () => {
      //Mocking  
      const validAuthor = TestUtil.returnAuthor();
      mockRepo.findOne.mockReturnValue(validAuthor);
      const author = await authorService.getAuthorById(1);
      
      //Asserting
      expect(author).toMatchObject(validAuthor);
      expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
     })
  })
  
  describe('createAuthor', () =>{
    it('should create an author', async () => {
      //Mocking  
      const validAuthor = TestUtil.returnAuthor();
      mockRepo.save.mockReturnValue(validAuthor);
      const createdAuthor = await authorService.createAuthor(validAuthor);
      
      //Asserting
      expect(createdAuthor).toMatchObject(validAuthor);
      expect(mockRepo.save).toHaveBeenCalledTimes(1);
     })
  })  

  describe('deleteAuthor', () =>{
    it('should delete an author', async () => {
      //Mocking  
      const validAuthor = TestUtil.returnAuthor();
      mockRepo.delete.mockReturnValue(true);
      mockRepo.findOne.mockReturnValue(validAuthor);
      const deletedAuthor = await authorService.deleteAuthor(validAuthor.id);
      
      //Asserting
      expect(deletedAuthor).toBe(true);
      expect(mockRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
     });
    it('should not delete an inexistent author', async () => {
        //Mocking  
        const validAuthor = TestUtil.returnAuthor();
        mockRepo.delete.mockReturnValue(false);
        mockRepo.findOne.mockReturnValue(null);
        const deletedAuthor = await authorService.deleteAuthor(validAuthor.id+1);
        
        //Asserting
        expect(deletedAuthor).toBe(false);
        expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
    })
  })
  
});
