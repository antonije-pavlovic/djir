import PostRepository from './post.repository';

export default class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  public create = async () => {
    return await this.postRepository.create();
  }
}