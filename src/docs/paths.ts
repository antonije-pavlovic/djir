import userPaths from './user/paths';
import postPaths from './post/paths';

export default {
  paths: {
    ...userPaths,
    ...postPaths
  }
}