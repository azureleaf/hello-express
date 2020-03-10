"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "田中太郎",
          gender: "male",
          office: "長町",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "鈴木可奈子",
          gender: "female",
          office: "仙台",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", {
      [Sequelize.Op.or]: [{ name: "鈴木可奈子" }, { name: "田中太郎" }]
    });
  }
};
