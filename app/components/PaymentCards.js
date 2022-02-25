import {
  Table,
  Button,
  useModal,
  Modal,
  Tag,
  Divider,
  Text,
  Progress,
  Spacer,
  Badge,
  useToasts,
} from "@geist-ui/core";
import { useEffect, useState } from "react";
import { format, intervalToDuration } from "date-fns";
import {
  Mail,
  Phone,
  DollarSign,
  CheckCircle,
  Clock,
  Calendar,
} from "@geist-ui/icons";
import PaymentModal from "./PaymentModal";
import { PlusCircle } from "@geist-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";

const PaymentCards = ({ balances }) => {
  const [data, setData] = useState();
  const [index, setIndex] = useState(null);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const { setVisible, bindings } = useModal();
  const [cancelModal, setCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToasts();

  const router = useRouter();

  useEffect(() => {
    setData();
    if (!balances) return;
    if (balances === "no results") return setData("no results");
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
        date: element.date
      };
    });
    setData(balanceList);
  }, [balances]);

  const renderAction = (rowData, rowIndex, value) => {
    const startDate = new Date(rowIndex.date)
    const endDate = new Date();

    return (
      <Badge scale={0.7}>
        {(intervalToDuration({start: startDate, end: endDate}).years * 365) + (intervalToDuration({start: startDate, end: endDate}).months * 30) + intervalToDuration({start: startDate, end: endDate}).days} days
      </Badge>
    );
  };

  const handleRowClick = (data) => {
    setIndex(data.index);
    setVisible(true);
  };

  const removeBalance = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/close-balance", {
      magic: balances[index]?.magic,
    });

    if (response.status === 200) {
        setIsLoading(false);
        setToast({ text: "Customer balance has been cleared", type: "success" });
        setCancelModal(false);
        setVisible(false);
        router.replace(router.asPath);
    } else {
      setIsLoading(false);
      setToast({
        text: "Something went wrong, please try again.",
        type: "error",
      });
    }
  };

  if (!data || !balances) return "";

  if (data === "no results")
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10  }}>
        <Tag type="error">No results found</Tag>
      </div>
    );

  if (!data.length)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <Tag type="lite">
          There are no outstanding balances at this time.
        </Tag>
      </div>
    );

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
          label="Days"
          render={renderAction}
          width={100}
        ></Table.Column>
      </Table>
      <Modal {...bindings} disableBackdropClick>
        <Modal.Title>
          {index || index === 0 ? balances[index]?.name : ""}
        </Modal.Title>
        <Modal.Subtitle>Oustanding Balance</Modal.Subtitle>
        <Modal.Content pt="5px">
          <Text h1 style={{ textAlign: "center" }}>
            $
            {balances[index]?.balance.toLocaleString("en-us", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tag type="lite">
              Paid $
              {balances[index]?.paid.toLocaleString("en-us", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}{" "}
              (
              {((balances[index]?.paid / balances[index]?.total) * 100).toFixed(
                2
              )}
              %)
            </Tag>
          </div>
          <Spacer />
          <Progress
            width="100%"
            scale={0.5}
            type="success"
            value={(
              (balances[index]?.paid / balances[index]?.total) *
              100
            ).toFixed(0)}
          />
          <Spacer />
          <Text h5>Customer Overview</Text>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: 4,
              paddingLeft: 4,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <DollarSign color="0070f3" size={16} />
              <Text margin={0} type="secondary" ml="5px">
                Bill Amount
              </Text>
            </span>
            <Text margin={0}>
              $
              {balances[index]?.total.toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: 4,
              paddingLeft: 4,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircle color="0070f3" size={16} />
              <Text margin={0} type="secondary" ml="5px">
                Amount Paid
              </Text>
            </span>
            <Text margin={0}>
              $
              {balances[index]?.paid.toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: 4,
              paddingLeft: 4,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Clock color="0070f3" size={16} />
              <Text margin={0} type="secondary" ml="5px">
                Balance
              </Text>
            </span>
            <Text margin={0}>
              $
              {balances[index]?.balance.toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: 4,
              paddingLeft: 4,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Calendar color="0070f3" size={16} />
              <Text margin={0} type="secondary" ml="5px">
                Date
              </Text>
            </span>
            <Text margin={0}>
              {balances[index]?.date
                ? format(new Date(balances[index].date), "MMM dd, yyyy")
                : ""}
            </Text>
          </div>
          <Divider />
          {balances[index]?.email ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Mail color="0070f3" size={16} />
                  <Text margin={0} type="secondary" ml="5px">
                    Email
                  </Text>
                </span>
                <Text margin={0}>{balances[index].email}</Text>
              </div>
              <Divider />
            </>
          ) : (
            ""
          )}
          {balances[index]?.phone ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Phone color="0070f3" size={16} />
                  <Text margin={0} type="secondary" ml="5px">
                    Phone
                  </Text>
                </span>
                <Text margin={0}>{balances[index].phone}</Text>
              </div>
              <Divider />
            </>
          ) : (
            ""
          )}
          <Spacer />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text h5 margin={0}>
              Recent Payments
            </Text>
            <Button
              type="secondary"
              auto
              scale={0.5}
              icon={<PlusCircle />}
              onClick={() => setPaymentVisible(true)}
            >
              Add
            </Button>
          </div>
          <Divider />
          {balances[index]?.payments ? (
            balances[index].payments.reverse().map((element) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: 4,
                      paddingLeft: 4,
                    }}
                  >
                    <Text small margin={0} type="secondary">
                      {format(new Date(element.date), "MMM dd, yyyy")}
                    </Text>
                    <Badge type="success">
                      $
                      {element.amount.toLocaleString("en-us", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </Badge>
                  </div>
                  <Divider />
                </>
              );
            })
          ) : (
            <Text type="error" style={{ textAlign: "center" }}>
              No Recent Payments
            </Text>
          )}
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action onClick={() => setCancelModal(true)}>
          Clear Balance
        </Modal.Action>
      </Modal>
      <PaymentModal
        paymentVisible={paymentVisible}
        setPaymentVisible={setPaymentVisible}
        magic={balances[index]?.magic}
        balance={balances[index]?.balance}
        setVisible={setVisible}
      />
      <Modal visible={cancelModal} disableBackdropClick>
        <Modal.Title mb="-5px">Close Balance</Modal.Title>
        <Modal.Content>
          <Text type="secondary" style={{ textAlign: "center" }} margin={0}>
            Are you sure you want to clear the customers balance?
          </Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setCancelModal(false)}>
          Go back
        </Modal.Action>
        <Modal.Action
          onClick={removeBalance}
          loading={isLoading ? true : false}
        >
          Clear Balance
        </Modal.Action>
      </Modal>
    </>
  );
};

export default PaymentCards;
