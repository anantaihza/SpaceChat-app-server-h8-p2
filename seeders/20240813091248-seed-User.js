'use strict';

const { hashPassword } = require('../helpers/bcryptjs');
const fs = require(`fs`).promises;

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
    const dataUser = JSON.parse(await fs.readFile(`./data/users.json`, `utf8`)).map((item) => {
      delete item.id;
      item.password = hashPassword(item.password);
      item.createdAt = item.updatedAt = new Date();
      return item
     });
  
     await queryInterface.bulkInsert(`Users`, dataUser, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
