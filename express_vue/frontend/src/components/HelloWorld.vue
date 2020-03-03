<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>See the browser console to check the Axios communciation result</p>
    <button @click="post">Express側にデータを送信</button>
    <button @click="post2">Express側にデータを送信（書き方その２）</button>
  </div>
</template>

<script>
import Methods from "@/api/methods";
import Axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    // ファイルを複数独立させ、それを経由してメンテしやすくした書き方の例
    // Instantiate the Axios object @index.js,
    // Define the post method @methods.js,
    // Run the posting in this .vue file
    async post() {
      let response = await Methods.testPosting();
      console.log(response);
    },
    // 今回はシンプルな例なので、上記のようにimportのリレーをしなくても全て直書きもできる
    async post2() {
      let response = await Axios.post("http://localhost:3000/test", {
        text: "Success!"
      });
      console.log(response);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
