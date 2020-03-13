import { IndexController} from "./controller/IndexController";
import { UserController } from "./controller/UserController";
import { OfficeController } from "./controller/OfficeController";


// それぞれのURLへの要求に対して、どのコントローラのどのアクションを起動するのかを定義
export const Routes = [
  {
    method: "get",
    route: "/",
    controller: IndexController,
    action: "show"
  },
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
  },
  {
    method: "get",
    route: "/offices/",
    controller: OfficeController,
    action: "all"
  }
];
