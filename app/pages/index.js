import Nav from "../components/Nav";
import PaymentCards from "../components/PaymentCards";
import { Spacer, Card, Text } from "@geist-ui/core";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";
import Head from 'next/head';

const Home = ({ balances }) => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(balances);
  const [totalOutstanding, setTotalOutstanding] = useState();

  useEffect(() => {
    if (!search) return setData(balances);
    const searchData = balances.filter((element) => {
      if (element.name.toLowerCase().includes(search.toLowerCase()))
        return element;
    });
    if (!searchData.length) {
      setData("no results");
    } else {
      setData(searchData);
    }
  }, [search, balances]);

  useEffect(() => {
    if (!balances.length) return setTotalOutstanding(0)
    const total = balances.reduce(
      (number, element) => number + element.balance,
      0
    );
    setTotalOutstanding(total);
  }, [balances]);

  return (
    <body style={{overflowX: 'unset'}}>
    <Head>
      <title>A-1 Carpet & Tile</title>
    </Head>
      <div style={{ padding: 16, animation: 'fadeIn forwards 0.75s ease', opacity: 0}}>
        <div style={{ maxWidth: 1000, margin: "auto", height: '100%' }}>
          <Nav setSearch={setSearch} />
          <Spacer />
          <Card py="0px">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text h2 margin={0}>
                Total Outstanding Balance
              </Text>
              <Text h1 margin={0}>
                $
                {totalOutstanding ?
                  totalOutstanding.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) : "0.00"}
              </Text>
            </div>
          </Card>
          <Spacer />
          <PaymentCards balances={data} />
        </div>
      </div>
    </body>
  );
};

export const getServerSideProps = async () => {
  // connect to mongodb
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("balances");

  // get all outstanding balances
  let balances = await collection.find({}).toArray();
  console.log(balances);
  balances = JSON.parse(JSON.stringify(balances));

  return { props: { balances: balances } };
};

export default Home;
