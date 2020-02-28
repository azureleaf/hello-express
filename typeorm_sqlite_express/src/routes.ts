import { UserController } from "./controller/UserController";
import { OfficeController } from "./controller/OfficeController";

export const Routes = [
  {
    method: "get",
    route: "/",
    controller: UserController,
    action: "all"
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
