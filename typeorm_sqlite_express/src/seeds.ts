import { User } from "./entity/User";
import { getConnection } from "typeorm";

exports.insertSeeds = async () => {
  // Insert the sample data
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ firstName: "太郎", lastName: "伊集院", achievement: 90 }])
    .execute();
};
