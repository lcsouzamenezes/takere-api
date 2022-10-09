import UserController = require('../../controllers/user.controller');
import Route = require('../route');
import validation = require('../../middlewares/validation.middleware');

class UsersRoute extends Route {
  private readonly userController: UserController;
  
  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.userController = new UserController();
  }

  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      validation(this.validationService.validateRequestCreateUser),
      (req: any, res: any, next: any) => this.userController.createUser(req, res, next)
    );
    router.post(
      '/login', 
      validation(this.validationService.validateRequestLogin),
      this.passport.authenticate('local'),
      (req: any, res: any, next: any) => this.userController.login(req, res, next)
    );
    router.get(
      validation(this.validationService.validateRequestLogout),
      '/logout',
      (req: any, res: any, next: any) => this.userController.logout(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export = UsersRoute;
