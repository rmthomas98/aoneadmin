import { Table, Button } from "@geist-ui/core";
import { useEffect, useState } from "react";

const PaymentCards = ({ balances }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const balanceList = balances.map((element, index) => {
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
      };
    });
    setData(balanceList);
  }, []);

  const renderAction = () => {
    return (
      <Button auto scale={0.5}>
        Info
      </Button>
    );
  };

  const handleRowClick = (data) => {
    console.log(data);
  };

  return (
    <>
      <Table
        data={data}
        hover={false}
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
    </>
  );
};

export default PaymentCards;
