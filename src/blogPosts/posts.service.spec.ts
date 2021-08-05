import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import RepoService from '../repo.service';
import Author from '../db/models/author.entity';
import TestUtil from '../shared/Test/test.util';
import BlogPost from '../db/models/posts.entity';
import { PostsService } from './posts.service';

describe('PostService', () => {
  let postService: PostsService; 
  const mockRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
  };
  const mockRepoAuthor = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PostsService,RepoService,
    {
        provide: getRepositoryToken(Author),
        useValue: mockRepoAuthor,
    },
    {
        provide: getRepositoryToken(BlogPost),
        useValue: mockRepo,
    }],
    }).compile();
  
    postService = app.get<PostsService>(PostsService);
});

  beforeEach(() =>{
    mockRepo.find.mockReset();
    mockRepo.findOne.mockReset();
    mockRepo.save.mockReset();
    mockRepo.delete.mockReset();
  });  

  describe('getAllPosts', () =>{
      it('should return all posts', async () => {
        //Mocking  
        const validPost = TestUtil.returnPost();
        mockRepo.find.mockReturnValue([validPost, validPost]);
        const posts = await postService.getAllPosts();
        
        //Asserting
        expect(posts).toHaveLength(2);
        expect(mockRepo.find).toHaveBeenCalledTimes(1);
       })
  })  
  
  describe('getPostByID', () =>{
    it('should return an specific Post', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.findOne.mockReturnValue(validPost);
      const post = await postService.getPostById(1);
      
      //Asserting
      expect(post).toMatchObject(validPost);
      expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
     })
  })

  describe('getPostsByFilter', () =>{
    it('should return Posts based on the filter (authorID and Date are valid)', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.find.mockReturnValue([validPost, validPost]);
      const posts = await postService.getPostFilter(1,'2021-08-02');
      
      //Asserting
      expect(posts).toHaveLength(2);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
     })

     it('should return Posts based on the filter (authorID is valid and Date is not valid)', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.find.mockReturnValue([validPost, validPost]);
      const posts = await postService.getPostFilter(1,null);
      
      //Asserting
      expect(posts).toHaveLength(2);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
     })

     it('should return Posts based on the filter (authorID is not valid and Date is valid)', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.find.mockReturnValue([validPost, validPost]);
      const posts = await postService.getPostFilter(null,'2021-08-02');
      
      //Asserting
      expect(posts).toHaveLength(2);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
     })

     it('should return Posts based on the filter (authorID is not valid and Date is not valid, thus this method will call getAllPosts)', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.find.mockReturnValue([validPost, validPost]);
      const posts = await postService.getPostFilter(null,null);
      
      //Asserting
      expect(posts).toHaveLength(2);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
     })
  })
  
  describe('createPost', () =>{
    it('should create a post', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      const validAuthor = TestUtil.returnAuthor();
      mockRepoAuthor.findOne.mockReturnValue(validAuthor);
      mockRepo.save.mockReturnValue(validPost);
      const createdPost = await postService.createPost(validPost, 1);
      
      //Asserting
      expect(createdPost).toMatchObject(validPost);
      expect(mockRepo.save).toHaveBeenCalledTimes(1);
     })

     it('should not create a post if author does not exist', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepoAuthor.findOne.mockReturnValue(null);
      mockRepo.save.mockReturnValue(validPost);
      const createdPost = await postService.createPost(validPost, 10);
      
      //Asserting
      expect(createdPost).toBe(null);
     })
  })  

  describe('deletePost', () =>{
    it('should delete a post', async () => {
      //Mocking  
      const validPost = TestUtil.returnPost();
      mockRepo.delete.mockReturnValue(true);
      mockRepo.findOne.mockReturnValue(validPost);
      const deletedAuthor = await postService.deletePost(validPost.id);
      
      //Asserting
      expect(deletedAuthor).toBe(true);
      expect(mockRepo.delete).toHaveBeenCalledTimes(1);
      expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
     });
    it('should not delete an inexistent post', async () => {
        //Mocking  
        const validPost = TestUtil.returnPost();
        mockRepo.delete.mockReturnValue(false);
        mockRepo.findOne.mockReturnValue(null);
        const deletedAuthor = await postService.deletePost(validPost.id+1);
        
        //Asserting
        expect(deletedAuthor).toBe(false);
        expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
    })
  })
  
});
