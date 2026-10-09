const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const [eventsCount] = await db.query('SELECT COUNT(*) AS total FROM events');
    const [usersCount] = await db.query("SELECT COUNT(*) AS total FROM users WHERE role = 'user'");
    const [regsCount] = await db.query("SELECT COUNT(*) AS total FROM registrations WHERE status = 'Confirmed'");

    const [capacityStats] = await db.query(`
      SELECT SUM(max_participants) AS total_capacity FROM events
    `);

    const [recentRegistrations] = await db.query(`
      SELECT r.id, r.registration_date, u.name AS user_name, u.email AS user_email, e.title AS event_title
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      JOIN events e ON r.event_id = e.id
      WHERE r.status = 'Confirmed'
      ORDER BY r.registration_date DESC
      LIMIT 5
    `);

    const totalEvents = eventsCount[0]?.total || 0;
    const totalUsers = usersCount[0]?.total || 0;
    const totalRegistrations = regsCount[0]?.total || 0;
    const totalCapacity = capacityStats[0]?.total_capacity || 0;
    const occupancyRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

    res.json({
      success: true,
      stats: {
        totalEvents,
        totalUsers,
        totalRegistrations,
        totalCapacity,
        occupancyRate
      },
      recentRegistrations
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats.' });
  }
};
