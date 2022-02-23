import {
  Text,
  AutoComplete,
  Divider,
  Button,
  Modal,
  useModal,
  Input,
  Spacer,
  useToasts,
} from "@geist-ui/core";
import { FilePlus, Calendar } from "@geist-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Router, useRouter } from "next/router";

const Nav = () => {
  const { setVisible, bindings } = useModal();
  const { setToast } = useToasts();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // send data to backend
    const response = await axios.post("/api/add-balance", {
      name: data.name,
      total: data.total,
      initial: data.initial,
      phone: data.phone,
      email: data.email,
      date: data.date,
    });

    // check for response
    if (response.status === 200) {
      setIsLoading(false);
      setVisible(false);
      setToast({ text: "Customer balance added!", type: "success" });
      return router.replace(router.asPath);
    } else {
      setIsLoading(false);
      setToast({
        text: "Something went wrong, please try again.",
        type: "error",
      });
    }
  };

  const checkErrors = () => {
    if (errors.name) {
      return setToast({
        text: "Please enter the customers name.",
        type: "error",
      });
    }
    if (errors.total?.type === "required") {
      return setToast({
        text: "Please enter the amount of the total bill.",
        type: "error",
      });
    }
    if (errors.total?.type === "pattern")
      return setToast({
        text: "You can only use numbers and decimals for the amount.",
        type: "error",
      });
    if (errors.initial?.type === "required") {
      return setToast({
        text: "Please enter the amount of the total bill.",
        type: "error",
      });
    }
    if (errors.initial?.type === "pattern")
      return setToast({
        text: "Only use numbers and decimals for the initial payment.",
        type: "error",
      });
    if (errors.date) {
      return setToast({ text: "Please enter a date.", type: "error" });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text h3 margin={0} style={{ fontWeight: 800 }}>
          A-1
        </Text>

        <div style={{ maxWidth: 500, width: "100%" }}>
          <AutoComplete placeholder="Customer Name..." width="100%" />
        </div>
        <Button
          type="secondary"
          scale={0.8}
          auto
          icon={<FilePlus />}
          onClick={() => setVisible(true)}
        >
          Add New
        </Button>
      </div>
      <Divider mt="15px" mb="0px" />
      <Modal {...bindings} disableBackdropClick>
        <Modal.Title>Add Oustanding Balance</Modal.Title>
        <Modal.Content>
          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              placeholder="Customer Name"
              width="100%"
              {...register("name", { required: true })}
            />
            <Spacer />
            <Input
              label="Amount"
              placeholder="Total Bill Amount"
              width="100%"
              {...register("total", {
                pattern: /^[0-9]\d*(\.\d+)?$/,
                required: true,
              })}
            />
            <Spacer />
            <Input
              label="Initial Payment"
              placeholder="Amount of Initial Payment"
              width="100%"
              {...register("initial", {
                pattern: /^[0-9]\d*(\.\d+)?$/,
                required: true,
              })}
            />
            <Spacer />
            <Input
              placeholder="Phone"
              label="Phone"
              width="100%"
              {...register("phone")}
            />
            <Spacer />
            <Input
              placeholder="Email"
              label="Email"
              width="100%"
              htmlType="email"
              {...register("email")}
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
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          htmlType="submit"
          form="my-form"
          onClick={checkErrors}
          loading={isLoading ? true : false}
        >
          Confirm
        </Modal.Action>
      </Modal>
    </>
  );
};

export default Nav;
