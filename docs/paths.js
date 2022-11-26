import userPaths from './account/paths';
import postPaths from './post/paths';

export default {
  paths: {
    ...userPaths,
    ...postPaths
  }
}