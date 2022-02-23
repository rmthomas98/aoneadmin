import Nav from "../components/Nav";
import PaymentCards from "../components/PaymentCards";
import { Spacer } from "@geist-ui/core";
import clientPromise from "../lib/mongodb";

const Home = ({ balances }) => {
  console.log(balances);
  return (
    <>
      <div style={{ padding: 16 }}>
        <div style={{ maxWidth: 1000, margin: "auto" }}>
          <Nav />
          <Spacer />
          <PaymentCards balances={balances} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // connect to mongodb
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("balances");

  // get all outstanding balances
  let balances = await collection.find({}).toArray();
  console.log(balances);
  balances = JSON.parse(JSON.stringify(balances));

  console.log(balances);

  return { props: { balances: balances } };
}

export default Home;
