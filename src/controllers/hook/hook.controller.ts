import express from 'express';
import HookInterface from 'interfaces/hook.interface';
import { sequelize } from '../../models/sql/sequelize';
import Controller from '../../interfaces/controller.interface';
import User from '../../models/sql/user.model';
import { sendMessageToUser } from '../../services/api';
import { welcomeMsg } from '../../utils/msg';

class HookController implements Controller {
  public router = express.Router();
  public userRepository = sequelize.getRepository(User);


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/hook`, this.handleHook);
  }

  private handleHook = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.body);
    const hookBody = request.body as HookInterface;
    const userId = hookBody.message.chat.id;
    const address = hookBody.message.text;
    if (address === '/start') {
      const name = hookBody.message.chat.first_name;
      await sendMessageToUser({userId, text: welcomeMsg({name})});
      response.send();
      return;
    }
    const existingUserAndAddress = await this.userRepository.findOne({
      where: {
        userId,
        address
      }
    });

    if (existingUserAndAddress) {
      await sendMessageToUser({userId, text: `We have already received the request for the address ${address} 😅`});
      response.send();
      return;
    }
    await this.userRepository.create({
      userId,
      address,
      txnCount: 0
    })
    await sendMessageToUser({userId, text: `We are now tracking the address ${address} for you 🧐`});
    response.send();
  };

}

export default HookController;
