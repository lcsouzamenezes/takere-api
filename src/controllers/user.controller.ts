import NewUserDTO = require('../dto/new-user.dto');
import UserDTO = require('../dto/user.dto');
import UserService = require('../services/user.service');
import LocaleService = require('../services/locale.service');

class UserController {
  localeService: LocaleService;
  userService: UserService;
  logger: any;

  constructor() {
    this.userService = new UserService();
    this.logger = require('../config/logger.config');
    this.localeService = new LocaleService();
  }

  public async login(req: any, res: any, next: any) {
    const user = await req.user;
  
    const userData: UserDTO = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    const token = await this.userService.login(userData);
  
    res.send({
      status: 200,
      message: this.localeService.translate('LOGIN_SUCCESS'),
      token,
      userData
    });
  }

  public async createUser(req: any, res: any, next: any) {
    const {firstName, lastName, password, email} = req.body
    const userData: NewUserDTO = {
      firstName,
      lastName,
      password,
      role: 'user',
      email,
      profileUrl: `https://api.adorable.io/avatars/285/${email}`
    }

    try {
      const createdUser = await this.userService.createUser(userData);
      res.send(createdUser)
    }
    catch (err) {
      next(err, req, res, next);
    }
  }
  
  public async logout(req: any, res: any, next: any) {
    req.logout();
    req.session.destroy(function (err: any) {
      next(err, req, res, next);
    });
  }
}

export = UserController;
