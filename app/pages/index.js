import Nav from "../components/Nav";
import PaymentCards from '../components/PaymentCards';
import {Spacer} from '@geist-ui/core';

const Home = () => {
  return (
    <>
    <div style={{padding: 16}}>
    <div style={{ maxWidth: 1000, margin: "auto" }}>
      <Nav />
      <Spacer />
      <PaymentCards />
    </div>
    </div>
    </>
  );
};

export default Home;
