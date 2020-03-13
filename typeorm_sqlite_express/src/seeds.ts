import { getConnection } from "typeorm";
import { Office } from "./entity/Office";
import { User } from "./entity/User";

// インターフェースで二度手間で型を宣言しなくても、entityを使いまわして型定義できる気がするが...

interface userObj {
  firstName: string;
  lastName: string;
  achievement: number;
}

interface officeObj {
  name: string;
  users: userObj[];
}

const offices: officeObj[] = [
  {
    name: "仙台",
    users: [
      { firstName: "大介", lastName: "佐藤", achievement: 20 },
      { firstName: "可奈子", lastName: "田中", achievement: 10 }
    ]
  },
  {
    name: "長町",
    users: [
      { firstName: "駿", lastName: "榊原", achievement: 99 },
      { firstName: "安奈", lastName: "坂上", achievement: 10 }
    ]
  }
];

exports.run = async () => {

  const connection = getConnection();

  // 既存のデータを全て削除
  await connection
    .createQueryBuilder()
    .delete()
    .from(Office)
    .execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();

  // 上記のユーザーデータを元にOfficeとUserの両テーブルに挿入
  offices.map(async office => {
    // この事業所のentity
    const officeObj = new Office();

    // この事業所のUserのEntityを追加していく配列
    const userObjs = [];
    office.users.map(async (user, index) => {
      userObjs.push(new User());

      // それぞれのユーザーの情報を登録
      userObjs[index].firstName = user.firstName;
      userObjs[index].lastName = user.lastName;
      userObjs[index].achievement = user.achievement;

      await connection.manager.save(userObjs[index]);
    });

    // 事業所情報の登録
    officeObj.name = office.name;
    officeObj.users = userObjs;
    await connection.manager.save(officeObj);
  });

  console.log("Seeding completed!");
};
