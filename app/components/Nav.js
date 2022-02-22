import {
  Text,
  Tabs,
  AutoComplete,
  Grid,
  Divider,
  Spacer,
  Tag,
} from "@geist-ui/core";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

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

        <Tabs
          style={{ marginBottom: -15 }}
          value={router.pathname}
          onChange={(route) => router.push(route)}
          hideBorder
          hideDivider
          hoverWidthRatio={1}
          align="center"
        >
          <Tabs.Item label="Payments" value="/"></Tabs.Item>
        </Tabs>
      </div>

      <Divider mt="15px" mb="0px" />
      <Spacer />
      <div style={{ display: "flex", paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ width: "100%" }}>
          <Tag type="lite">Name</Tag>
        </div>
        <div style={{ width: "100%" }}>
          <Tag type="lite">$ Amount</Tag>
        </div>
        <div style={{ width: "100%" }}>
          <Tag type="lite">$ Paid</Tag>
        </div>
        <div style={{ width: "100%" }}>
          <Tag type="lite">Balance</Tag>
        </div>
        <div style={{ minWidth: 57 }}></div>
      </div>
    </>
  );
};

export default Nav;
