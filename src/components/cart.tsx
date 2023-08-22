'use client';

import { selectCart, selectShippingPrice, selectSubtotal, selectTaxes, selectTotal, selectTotalCouponsAmount } from '@store/app/selectors';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectSubtotal)
  const shippingPrice = useSelector(selectShippingPrice)
  const taxes = useSelector(selectTaxes)
  const total = useSelector(selectTotal)
  const couponsAmount = useSelector(selectTotalCouponsAmount)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            (cart.products ?? []).map((p) => {
              return (
                <tr key={p.id}>
                  <td>{ p.name }</td>
                  <td>${ p.price.toFixed(2) }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        <p>Sub-total: ${subtotal}</p>
        <p>Coupons: -${couponsAmount}</p>
        <p>Shipping: ${shippingPrice}</p>
        <p>Taxes: ${taxes}</p>
        <p>Total: ${total}</p>
      </div>
    </>
  );
};

export default Cart;