import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/app/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Monthly Visitors
    const [visitors] = await db.query(`
      SELECT 
        MONTH(visited_at) AS month,
        COUNT(*) AS count
      FROM visitors
      WHERE YEAR(visited_at) = YEAR(CURDATE())
      GROUP BY MONTH(visited_at)
      ORDER BY month
    `) as any;

    const monthlyVisitors = Array(12).fill(0);
    visitors.forEach((row: any) => {
      monthlyVisitors[row.month - 1] = row.count;
    });

    // 2. Total Visitors (all-time)
    const [visitorTotalRow]: any = await db.query(`SELECT COUNT(*) as total FROM visitors`);
    const totalVisitors = visitorTotalRow[0].total;

    // 3. Total Properties
    const [propertyRows]: any = await db.query(`SELECT COUNT(*) as total FROM listedproperties`);
    const totalProperties = propertyRows[0].total;

    // 4. Total Enquiries
    const [enquiryRows]: any = await db.query(`SELECT COUNT(*) as total FROM propertyenquiries`);
    const totalEnquiries = enquiryRows[0].total;

    // Final response
    return res.status(200).json({
      success: true,
      monthlyVisitors,
      totalVisitors,
      totalProperties,
      totalEnquiries
    });

  } catch (err) {
    console.error('Dashboard summary fetch failed:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
