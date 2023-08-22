import { Cart } from '@models/cart';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;

  const productsPriceTotal = cart.products?.reduce((total, p) => total + p.price, 0) ?? 0

  res.status(200).json({
    ...cart,
    shippingPrice: productsPriceTotal * 0.05 
  } as Cart)
}
