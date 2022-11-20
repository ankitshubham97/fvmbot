import express from 'express';
import Controller from '../../interfaces/controller.interface';

class UserController implements Controller {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * GET /users
     * @tag user
     * @summary Get users
     * @operationId getUsers
     * @headerParam {string} X-API-KEY
     * @description Get Users. This returns a maximum of 10 users. Use offset and limit query parameters to fetch more users.
     * @queryParam {integer} [offset=0] - The number of items to skip before starting to collect the result set
     * @queryParam {integer} [limit=10] - The numbers of items to return
     * @response 200 - successful operation
     * @responseContent {User[]} 200.application/json
     */
    this.router.get(`/users`, () => {});

    /**
     * GET /user/{userId}
     * @tag user
     * @summary Get user by user id
     * @operationId getUserById
     * @headerParam {string} X-API-KEY
     * @pathParam {string} userId - The user id that needs to be fetched. Use user1 for testing.
     * @response 200 - successful operation
     * @responseContent {User} 200.application/json
     * @response 400 - Invalid userId supplied
     * @response 404 - User not found
     */
    this.router.get(`/users/:userId`, () => {});

    /**
     * POST /user
     * @tag user
     * @summary Create user
     * @description This can only be done by the logged in user.
     * @operationId createUser
     * @headerParam {string} X-API-KEY
     * @bodyDescription Created user object
     * @bodyContent {User} application/json
     * @bodyRequired
     * @response default - successful operation
     */
    this.router.post(`/users`, () => {});

    /**
     * PUT /user/{userId}
     * @tag user
     * @summary Update user
     * @operationId updateUser
     * @headerParam {string} X-API-KEY
     * @pathParam {string} userId - userId of the user that need to be updated
     * @bodyDescription New user object
     * @bodyContent {User} application/json
     * @bodyRequired
     * @response 400 - Invalid user supplied
     * @response 404 - User not found
     */
    this.router.put(`/users`, () => {});

    /**
     * DELETE /user/{userId}
     * @tag user
     * @summary Delete user
     * @operationId deleteUser
     * @headerParam {string} X-API-KEY
     * @pathParam {string} userId - userId of the user that needs to be deleted
     * @response 400 - Invalid userId supplied
     * @response 404 - User not found
     */
    this.router.delete(`/users`, () => {});
  }

}

export default UserController;
