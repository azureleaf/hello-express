import Api from "./index";

export default {
  testPosting() {
    // Use the axios instance defined @api/index.js
    return Api().post("/echo", { text: "Success!" });
  }
};
