import successImg from "/assets/success.png";
import failedImg from "/assets/failure.png";
import { Link, useLocation } from "react-router-dom";

const TransactionResult = () => {
  const { state } = useLocation();
  
  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  // e.g. "ORD-1716290000000-382"

  const visibleOrderId = orderId.slice(-6);

  return (
    <div className="h-screen flex justify-center items-center test ">
      <div className="test flex flex-col items-center gap-5">
        <img
          src={state.success ? successImg : failedImg}
          alt={state.success ? "Success" : "Failure"}
          className="size-12"
        />
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-helvetocaMedium text-[26px]">
            {state.success ? "Transaction Successful" : "Transaction Failed"}
          </h1>
          {state.success ? (
            <p className="font-helvetocaRegular text-[14px] text-[#797979]">
              Order Number #{visibleOrderId}
            </p>
          ) : (
            ""
          )}
        </div>
        {state.success ? (
          <Link to="/user/orders" className="blueButton">
            My Orders
          </Link>
        ) : (
          <Link to="/checkout" className="blueButton">
            Back To Cart
          </Link>
        )}
      </div>
    </div>
  );
};

export default TransactionResult;
