import * as auth from "./controllers/authController";
import * as data from "./controllers/dataController";
import * as events from "./controllers/eventsController";
import * as news from "./controllers/newsController";
import * as user from "./controllers/usersController";

const ApiController = {
  auth,
  data,
  events,
  news,
  user
};

export default ApiController;
