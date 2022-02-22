import { Card, Text, Grid, Progress, Button, Tooltip } from "@geist-ui/core";

const PaymentCards = () => {
  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text h5 margin={0} width="100%">
            customer name
          </Text>
          <Text type="secondary" margin={0} width="100%" small>
            $615.33
          </Text>
          <Text type="secondary" margin={0} width="100%" small>
            $615.33
          </Text>
          <Text type="secondary" margin={0} width="100%" small>
            $615.33
          </Text>
          <Button auto scale={0.8}>
            Info
          </Button>
        </div>
      </Card>
    </>
  );
};

export default PaymentCards;
