import { Cart } from '@models/cart';
import { Product } from '@models/product';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER: 
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body).oldCart as Cart;
  const product = JSON.parse(req.body).product as Product;
  const now = Date.now();

  res.status(200).json({
    // QUESTION: What does the '...' operator do?
    // ANSWER: 
    ...cart,
    // QUESTION: What does the '??' operator do?
    //           What values of cart.products would cause '[]` to be used for the concat call?
    // ANSWER: 
    products: (cart.products ?? []).concat(Object.keys(product).length>0?product:{
      id: Date.now().toString(),
      name: `Product ${(Date.now() / 1000).toFixed(0)}`,
      price: now % 2 === 0 ? 56 : 65
    })
  } as Cart)
}
