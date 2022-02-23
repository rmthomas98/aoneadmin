import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  try {
    //get details from fontend
    const { name, total, initial, phone, email, date } = req.body;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("balances");

    // create new balance document for mongodb
    const newDocument = {
      name: name,
      total: Number(total),
      paid: Number(initial),
      balance: Number(total - initial),
      phone: phone ? phone : null,
      email: email ? email : null,
      date: date,
      fullyPaid: initial === total ? true : false,
      payments: [{ amount: Number(initial), date: date }],
    };

    // insert document into mongodb
    await collection.insertOne(newDocument);

    res.status(200).send("balance added");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
