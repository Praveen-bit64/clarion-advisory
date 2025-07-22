import { db } from '@/app/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }

  try {
    const [rows]: any[] = await db.query('SELECT * FROM homecomponents WHERE id = 1');
    const [reviews]: any[] = await db.query('SELECT * FROM reviews');

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        error: false,
        heroBanner: { title: '', description: '', isvisible: false },
        featuredlistings: [],
        testimonials:{},
        reviews:reviews,
        footer:{copyright:'',popularsearch:[],discover:[]}
      });
    }

    const row = rows[0];
    const bannerData = JSON.parse(row?.herobanner || '{}');
    const featuredlistings = JSON.parse(row?.featuredlistings || '[]');
    const counter = JSON.parse(row?.counter || '{}');
    const recentlyadded = JSON.parse(row?.recentlistings || '{}');
    const testimonials = JSON.parse(row?.testimonials || '{}')
    const footer = JSON.parse(row?.footer || '{}')

return res.status(200).json({
  error: false,
  heroBanner: bannerData,
  featuredlistings: featuredlistings,
  counter: counter,
  recentlyadded: recentlyadded,
  testimonials: testimonials,
  reviews: reviews,
  footer:footer
});
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : 'Unknown error';
    console.error('Fetch error:', err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
}
