import { useThunkDispatch } from '@hooks/useThunkDispatch';
import { addCouponAsync, recalculateShippingAsync, recalculateTaxesAsync } from '@store/app/thunks';
import { selectCart} from "@store/app/selectors";
import { useSelector } from "react-redux";

const AddCoupon = () => {
  const thunkDispatch = useThunkDispatch();

  const cart = useSelector(selectCart);
  
  /* event handler */
  const addCoupon = async () =>{
    try{
      if(cart?.coupons?.length==2){
        throw("You cannot use more than coupouns");
      }
      await thunkDispatch(addCouponAsync()).unwrap();
      await thunkDispatch(recalculateShippingAsync()).unwrap();
      await thunkDispatch(recalculateTaxesAsync()).unwrap();
    }
    
    catch(err:any){
      console.log(err);
    }
  }
  
  return <>
    <button onClick={addCoupon} disabled={cart?.coupons?.length==2}>Add Coupon</button>
  </>
};

export default AddCoupon;