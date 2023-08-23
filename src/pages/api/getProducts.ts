import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER:
  res: NextApiResponse<any>
) {
  res.status(200).json({
    products: [
      { id: "product12", name: "Product 1", price: 74 },
      { id: "product123", name: "Product 2", price: 44 },
      { id: "product1234", name: "Product 3", price: 84 },
    ],
  } as Cart);
}
