import { Modal, Input, useToasts, Spacer } from "@geist-ui/core";
import { Calendar } from "@geist-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

const PaymentModal = ({
  paymentVisible,
  setPaymentVisible,
  magic,
  balance,
  setVisible,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await axios.post("/api/add-payment", {
      amount: data.amount,
      date: data.date,
      magic,
    });
    // check response
    if (response.data === "balance deleted") {
      setIsLoading(false);
      reset();
      setPaymentVisible(false);
      setVisible(false);
      setToast({
        text: "The customer has paid the full bill!",
        type: "success",
      });
      return router.replace(router.asPath);
    }
    if (response.status === 200) {
      reset();
      setPaymentVisible(false);
      setIsLoading(false);
      setToast({ text: "Payment added!", type: "success" });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      setToast({
        text: "Something went wrong, please try again.",
        type: "error",
      });
    }
  };

  const handleErrorCheck = () => {
    if (errors.amount?.type === "required")
      return setToast({
        text: "Please enter the payment amount",
        type: "error",
      });
    if (errors.amount?.type === "pattern")
      return setToast({
        text: "Only use numbers and decimals for the payment amount",
        type: "error",
      });
    if (errors.date)
      return setToast({
        text: "Please enter the date of the payment.",
        type: "error",
      });
  };

  return (
    <Modal visible={paymentVisible} disableBackdropClick>
      <Modal.Title>Add Payment</Modal.Title>
      <Modal.Subtitle>
        current balance: $
        {balance?.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Modal.Subtitle>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} id="my-form">
          <Input
            label="Amount"
            width="100%"
            placeholder="Payment Amount"
            {...register("amount", {
              pattern: /^[0-9]\d*(\.\d+)?$/,
              required: true,
            })}
          />
          <Spacer />
          <div style={{ position: "relative" }}>
            <Input
              htmlType="date"
              label="Date"
              width="100%"
              style={{ color: "#888" }}
              {...register("date", { required: true })}
            />

            <div
              style={{
                position: "absolute",
                bottom: 3,
                right: 12,
                pointerEvents: "none",
              }}
            >
              <Calendar size={20} />
            </div>
          </div>
        </form>
      </Modal.Content>
      <Modal.Action passive onClick={() => setPaymentVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action
        htmlType="submit"
        form="my-form"
        loading={isLoading ? true : false}
        onClick={handleErrorCheck}
      >
        Confirm
      </Modal.Action>
    </Modal>
  );
};

export default PaymentModal;
