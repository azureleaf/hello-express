<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="users">
      <h2>登録済みメンバー一覧</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">
          ID: {{ user.id }}, 名前： {{ user.name }}, 性別： {{ user.gender }},
          事業所： {{ user.office }}
          <button @click="deleteUser(user.id)">X</button>
        </li>
      </ul>
    </div>
    <div>
      <h2>新規登録</h2>
      <input v-model="name" placeholder="名前を入力" />
      <input
        type="radio"
        id="pick_male"
        name="gender"
        value="male"
        v-model="gender"
      />
      <label for="pick_male">男</label>
      <input
        type="radio"
        id="pick_female"
        name="gender"
        value="female"
        v-model="gender"
      />
      <label for="pick_female">女</label>
      <select v-model="office">
        <option disabled value>事業所を選択</option>
        <option>仙台</option>
        <option>長町</option>
        <option>泉</option>
      </select>
      <button @click="postNewUser">送信</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "HelloWorld",
  data: () => {
    return {
      office: "",
      name: "",
      gender: "male",
      users: null
    };
  },
  props: {
    msg: String
  },
  methods: {
    // 新規ユーザを登録し、新しいメンバー一覧を受け取る
    async postNewUser() {
      try {
        let response = await Axios.post("http://localhost:3000/users/add", {
          name: this.name,
          gender: this.gender,
          office: this.office
        });
        this.users = response.data;
      } catch (err) {
        console.error("登録時エラー：", err);
      }
    },
    async deleteUser(id) {
      let response = await Axios.post(
        "http://localhost:3000/users/delete/" + id
      );
      this.users = response.data;
    }
  },
  created() {
    // ページ読み込み時に登録済みユーザ一覧をサーバーから取得
    Axios.get("http://localhost:3000/users/")
      .then(response => {
        this.users = response.data;
      })
      .catch(err => {
        console.error("サーバーからのデータ取得時にエラー:", err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
