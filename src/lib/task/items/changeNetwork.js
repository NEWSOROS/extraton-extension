import database from '@/db';

export default {
  name: 'changeNetwork',
  handle: async function (task) {
    const {network} = task.data;
    const db = await database.getClient();
    await db.param.update('network', {value: network});
  }
}