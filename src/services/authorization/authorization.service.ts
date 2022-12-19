import AuthorizationRepository from './authorization.repository';

export default class AuthorizationService {

  private authorizationRepository: AuthorizationRepository;

  constructor() {
    this.authorizationRepository = AuthorizationRepository.getInstance();
  }

  public getTemplatePermssions = async () => {
    return await this.authorizationRepository.getTemplatePermssions();
  }
}