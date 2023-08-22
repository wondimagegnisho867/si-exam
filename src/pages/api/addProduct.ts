import { Cart } from '@models/cart';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER: 
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();

  res.status(200).json({
    // QUESTION: What does the '...' operator do?
    // ANSWER: 
    ...cart,
    // QUESTION: What does the '??' operator do?
    //           What values of cart.products would cause '[]` to be used for the concat call?
    // ANSWER: 
    products: (cart.products ?? []).concat({
      id: '123',
      name: `Product ${(Date.now() / 1000).toFixed(0)}`,
      price: now % 2 === 0 ? 56 : 65
    })
  } as Cart)
}
