import { useThunkDispatch } from '@hooks/useThunkDispatch';
import { addCouponAsync } from '@store/app/thunks';

const AddCoupon = () => {
  const thunkDispatch = useThunkDispatch();
  return <>
    <button onClick={async () => await thunkDispatch(addCouponAsync()).unwrap()}>Add Coupon</button>
  </>
};

export default AddCoupon;