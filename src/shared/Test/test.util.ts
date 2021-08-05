import Author from "./../../db/models/author.entity";
import BlogPost from "./../../db/models/posts.entity";

export default class TestUtil {
    static returnAuthor(): Author{
        const author = new Author();
        author.id = 1;
        author.name = 'Valid Name';
        author.birthday = new Date();
        author.nickname = 'Valid Nickname';
        author.creationDate = new Date();
        author.updatedAt = new Date();

        return author;
    }

    static returnPost(): BlogPost{
        const post = new BlogPost();
        post.id = 1;
        post.authorId = 1;
        post.title = 'Valid Title';
        post.body = 'Valid Content Body';
        post.createdAt = new Date();
        post.updatedAt = new Date();

        return post;
    }
}