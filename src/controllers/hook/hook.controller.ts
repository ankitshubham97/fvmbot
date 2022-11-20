import express from 'express';
import Controller from '../../interfaces/controller.interface';

class HookController implements Controller {
  public router = express.Router();

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
    response.send(request.body);
  };

}

export default HookController;
