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
      { firstName: "安奈", lastName: "坂上", achievement: 10 },
      { firstName: "翔太", lastName: "鈴木", achievement: 0 }
    ]
  }
];

// 既存のデータを全て削除
const deleteAll = async conn => {
  // OneToManyの関係上、Userを先に削除しないとエラーになる
  await conn
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
  await conn
    .createQueryBuilder()
    .delete()
    .from(Office)
    .execute();
};

// 一番簡潔に書く書き方。（失敗中）
// user側にforeign keyのofficeIdが自動挿入されないバグ
exports.run = async () => {
  const connection = getConnection();

  deleteAll(connection);

  // 上記のユーザーデータを元にOfficeとUserの両テーブルに挿入
  offices.map(async office => {
    // この事業所のentity
    const officeObj: Office = new Office();

    // この事業所のUserのEntityを追加していく配列
    const userObjs: User[] = [];
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
    console.log(userObjs);
    await connection.manager.save(officeObj);
  });

  console.log("Seeding completed!");
};

// やや冗長な書き方（成功する）
exports.run2 = async () => {
  try {
    const connection = getConnection();

    deleteAll(connection);

    const user1 = new User();
    user1.firstName = "義和";
    user1.lastName = "鈴木";
    user1.achievement = 80;
    await connection.manager.save(user1);

    const user2 = new User();
    user2.firstName = "佐和子";
    user2.lastName = "田中";
    user2.achievement = 20;
    await connection.manager.save(user2);

    const user3 = new User();
    user3.firstName = "大介";
    user3.lastName = "佐藤";
    user3.achievement = 0;
    await connection.manager.save(user3);

    const user4 = new User();
    user4.firstName = "凛";
    user4.lastName = "橋本";
    user4.achievement = 100;
    await connection.manager.save(user4);

    // Add office
    const office1 = new Office();
    office1.name = "Sendai";
    office1.users = [user1, user2];
    await connection.manager.save(office1);

    const office2 = new Office();
    office2.name = "Nagamachi";
    office2.users = [user3, user4];
    await connection.manager.save(office2);
  } catch (err) {
    console.error(err);
  }
};
