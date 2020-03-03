<template>
  <div class="about">
    <h1>送信データを元にJSONを返してみる</h1>
    <h2>サーバーにデータを送信</h2>
    <input v-model="name" placeholder="名前を入力" />
    <select v-model="office">
      <option disabled value>事業所を選択</option>
      <option>仙台</option>
      <option>長町</option>
      <option>泉</option>
    </select>
    <button @click="post">送信</button>
    <h2>サーバーからの返信内容</h2>
    <p v-for="(value, key) in responseData" :key="key">
      {{ key }} : {{ value }}
    </p>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  name: "ResJson",
  data() {
    return {
      name: "鈴木",
      office: "仙台",
      responseData: {}
    };
  },
  methods: {
    async post() {
      let response = await Axios.post("http://localhost:3000/members", {
        memberName: this.name,
        memberOffice: this.office
      });
      this.responseData = response.data;
    }
  }
};
</script>
