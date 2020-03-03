<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Expressに固定値を送信</h2>
    <button @click="post">Express側にデータを送信</button>
    <button @click="post2">Express側にデータを送信（書き方その２）</button>
    <h2>Expressから返ってきた結果</h2>
    <p>
      今回はVue.jsで受け取っているので、res.render()の結果のHTMLファイルがそのままこのページそのものとして表示されることはない。以下にそれをv-htmlで部分表示する。
    </p>
    <div v-html="responseHTML" id="showResponse"></div>
  </div>
</template>
<script>
import Methods from "@/api/methods";
import Axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Express側でres.render()してみる",
      responseHTML: ""
    };
  },
  methods: {
    // ファイルを複数独立させ、それを経由してメンテしやすくした書き方の例
    // Instantiate the Axios object @api/index.js,
    // Define the post method @api/methods.js,
    // Run the posting in this .vue file
    // このvueファイル部分自体を肥大化させたくないときに有意義だと思われる
    async post() {
      let response = await Methods.testPosting();
      console.log(response);
      this.responseHTML = response.data;
    },
    // 今回はシンプルな例なので、上記のようにimportのリレーをしなくても全て直書きもできる
    async post2() {
      let response = await Axios.post("http://localhost:3000/echo", {
        text: "Success!"
      });
      console.log(response);
      this.responseHTML = response.data;
    }
  }
};
</script>
<style scoped>
#showResponse {
  background-color: blanchedalmond;
  border: solid 1px yellow;
}
</style>
