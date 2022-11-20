import express from 'express';
import { sequelize } from '../../models/sql/sequelize';
import User from '../../models/sql/user.model';
import Controller from '../../interfaces/controller.interface';

class UserController implements Controller {
  public router = express.Router();
  public userRepository = sequelize.getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/users`, this.getUsers);
    this.router.put(`/users/userId/:userId/address/:address`, this.updateUser);
  }

  private getUsers = async (
    _: express.Request,
    response: express.Response
  ) => {
    const users = await this.userRepository.findAll();    
    response.send({users});
  };

  private updateUser = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { userId, address } = request.params;
    const { txnCount, firstTime } = request.body;
    const users = await this.userRepository.update({
      txnCount,
      firstTime
    },{
      where: {
        userId,
        address,
      }
    });   
    response.send({users});
  };

}

export default UserController;
