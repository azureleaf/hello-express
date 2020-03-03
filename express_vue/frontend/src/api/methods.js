import Api from "./index";

export default {
  testPosting() {
    // Use the axios instance defined in api/index.js
    return Api().post("/test", { text: "Success!" });
  }
};
