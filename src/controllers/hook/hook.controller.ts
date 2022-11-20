import express from 'express';
import HookInterface from 'interfaces/hook.interface';
import { sequelize } from '../../models/sql/sequelize';
import Controller from '../../interfaces/controller.interface';
import User from '../../models/sql/user.model';
import { sendMessageToUser } from '../../services/api';
import { errorMsg, welcomeMsg } from '../../utils/msg';

class HookController implements Controller {
  public router = express.Router();
  public userRepository = sequelize.getRepository(User);


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/hook`, this.handleHook);
  }

  private containsWhitespace(str: string) {
    return /\s/.test(str);
  }

  private handleHook = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.body);
    const hookBody = request.body as HookInterface;
    const userId = hookBody.message.chat.id;
    let address = hookBody.message.text;
    const name = hookBody.message.chat.first_name;
    if (address === '/start') {
      await sendMessageToUser({userId, text: welcomeMsg({name})});
      response.send();
      return;
    }
    if (address.startsWith('remove')) {
      address = address.split('remove')[1].trim();
      await sendMessageToUser({userId, text: `We will now stop tracking the address ${address} 🫡`});
      await this.userRepository.destroy({
        where: {
          userId,
          address,
        }
      })
      return;
    }
    if (this.containsWhitespace(address)) {
      await sendMessageToUser({userId, text: errorMsg({name})});
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
      txnCount: 0,
      firstTime: true
    })
    await sendMessageToUser({userId, text: `We are now tracking the address ${address} for you 🧐`});
    response.send();
  };

}

export default HookController;
