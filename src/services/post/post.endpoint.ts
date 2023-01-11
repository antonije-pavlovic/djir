import PostService from './post.service';

export default class PostEndpoint {
  private postService: PostService;


  constructor() {
    this.postService = new PostService();
  }

  public create = async () => {
    return await this.postService.create();
  }
}