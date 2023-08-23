"use client";

import { useThunkDispatch } from "@hooks/useThunkDispatch";
import {
  selectCart,
  selectShippingPrice,
  selectSubtotal,
  selectTaxes,
  selectTotal,
  selectTotalCouponsAmount,
} from "@store/app/selectors";
import { useSelector } from "react-redux";
import { removeProduct,removeCoupoun } from "@store/app/slice";
import { recalculateShippingAsync, recalculateTaxesAsync } from '@store/app/thunks'
import { useDomLoaded } from "@hooks/useDomLoaded";


const Cart = () => {
  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectSubtotal);
  const shippingPrice = useSelector(selectShippingPrice);
  const taxes = useSelector(selectTaxes);
  const total = useSelector(selectTotal);
  const couponsAmount = useSelector(selectTotalCouponsAmount);

  const dispatch = useThunkDispatch();
  const {domLoaded} = useDomLoaded();

  /* event handler */
  const removeProductItem = async(id: string) => {
    dispatch(removeProduct(id));
    try{
        await dispatch(recalculateShippingAsync()).unwrap();
        await dispatch(recalculateTaxesAsync()).unwrap();
    }catch(err){
      console.log(err);
    }
    
  };

  const removeCoupounItem = async(id: string) => {
    dispatch(removeCoupoun(id));
    try{
        await dispatch(recalculateShippingAsync()).unwrap();
        await dispatch(recalculateTaxesAsync()).unwrap();
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <>
    {domLoaded && <>
      <h3>My products</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(cart.products ?? []).map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeProductItem(p.id)}>
                    Remove Product
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>My coupouns</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Coupoun</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(cart.coupons ?? []).map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.discount.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeCoupounItem(p.id)}>
                    Remove Coupoun
                  </button>
                </td>
              </tr>
            );
          })}
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
      }
    </>
  );
};

export default Cart;
