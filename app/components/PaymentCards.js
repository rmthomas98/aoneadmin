import {
  Table,
  Button,
  useModal,
  Modal,
  Card,
  Tag,
  Divider,
  Text,
} from "@geist-ui/core";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const PaymentCards = ({ balances }) => {
  const [data, setData] = useState();
  const [index, setIndex] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const { setVisible, bindings } = useModal();

  useEffect(() => {
    const balanceList = balances.reverse().map((element, index) => {
      return {
        name: element.name,
        total: `$${element.total.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        paid: `$${element.paid.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        balance: `$${element.balance.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        index: index,
        fullyPaid: element.fullyPaid,
        payments: element.payments,
        rawPaid: element.paid,
        rawTotal: element.total,
        rawBalance: element.balance,
        date: element.date,
        email: element.email,
        phone: element.phone,
      };
    });
    setData(balanceList);
  }, [balances]);

  const renderAction = () => {
    return (
      <Button auto scale={0.5}>
        Info
      </Button>
    );
  };

  const handleRowClick = (data) => {
    console.log(data);
    setIndex(data.index);
    setVisible(true);
  };

  return (
    <>
      <Table
        data={data}
        style={{ textTransform: "capitalize" }}
        onRow={handleRowClick}
      >
        <Table.Column label="Name" prop="name"></Table.Column>
        <Table.Column label="$ Total" prop="total"></Table.Column>
        <Table.Column label="$ Paid" prop="paid"></Table.Column>
        <Table.Column label="Balance" prop="balance"></Table.Column>
        <Table.Column
          label="Update"
          render={renderAction}
          width={100}
        ></Table.Column>
      </Table>
      <Modal {...bindings}>
        <Modal.Title>
          {index || index === 0 ? balances[index].name : ""}
        </Modal.Title>
        <Modal.Subtitle>Balance Overview</Modal.Subtitle>
        <Modal.Content></Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Close
        </Modal.Action>
      </Modal>
    </>
  );
};

export default PaymentCards;
