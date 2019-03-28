'use strict';

export default {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user', [
      {
        id: 1,
        given_name: 'Ed',
        last_name: 'Watson',
        email: 'ed@edmail.com',
        email_verified: true,
      },
    ], {
      validate: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
