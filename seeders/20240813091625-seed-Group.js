'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataGroup = JSON.parse(await fs.readFile(`./data/groups.json`, `utf8`)).map((item) => {
      delete item.id;
      item.createdAt = item.updatedAt = new Date();
      return item
     });
  
     await queryInterface.bulkInsert(`Groups`, dataGroup, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
