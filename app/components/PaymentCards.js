import { Table, Button } from "@geist-ui/core";

const PaymentCards = () => {

  const data = [{
    name: 'ryan',
    amount: 3454,
    paid: 500,
    due: 2756
  }]

  const renderAction = () => {
    return (
      <Button auto scale={0.5}>Info</Button>
    )
  }

  return (
    <>
      <Table data={data} hover={false}>
        <Table.Column label="Name" prop="name"></Table.Column>
        <Table.Column label="$ Amount" prop="amount"></Table.Column>
        <Table.Column label="$ Paid" prop="paid"></Table.Column>
        <Table.Column label="$ Due" prop="due"></Table.Column>
        <Table.Column label="Info" render={renderAction} width={100}></Table.Column>
      </Table>
    </>
  );
};

export default PaymentCards;
