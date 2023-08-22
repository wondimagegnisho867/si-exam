import { Cart } from '@models/cart';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();

  res.status(200).json({
    ...cart,
    coupons: (cart.coupons ?? []).concat({
      id: '123',
      name: `Coupon ${(Date.now() / 1000).toFixed(0)}`,
      discount: now % 2 === 0 ? 25 : 42
    })
  } as Cart)
}
