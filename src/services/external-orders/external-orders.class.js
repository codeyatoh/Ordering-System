export class ExternalOrdersService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    const db = this.options.app.get('postgresqlClient');
    // 1. Check if crew_id exists
    const crew = await db('crew').where({ crew_id: data.crew_id }).first();
    if (!crew) {
      // 2. If not, create it (use default values or get from data)
      await db('crew').insert({
        crew_id: data.crew_id,
        first_name: data.crew_first_name || 'Unknown',
        last_name: data.crew_last_name || '',
        email: data.crew_email || '',
        gender: data.crew_gender || '',
        status: 'active',
        hire_date: new Date()
      });
    }
    // 3. Now insert the order
    const [order] = await db('orders').insert(data).returning('*');
    return order;
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('orders').select('*');
  }
} 