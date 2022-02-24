import clientPromise from '../../lib/mongodb'

const handler = async (req, res) => {
  try {
    // get data from font end
    const {amount, date, magic} = req.body;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('balances');

    // get user from mongodb using magic string
    const user = await collection.findOne({magic: magic});

    // create the update object
    const updateBalance = {
      $set: {
        payments: user.payments ? [{amount: Number(amount), date: date}, ...user.payments] : [{amount: Number(amount), date: date}],
        balance: user.balance - Number(amount),
        paid: user.paid + Number(amount)
      }
    }

    // update document in mongodb
    await collection.updateOne({magic: magic}, updateBalance);

    // send response back to front end
    res.status(200).send('payment added')

  } catch {
    res.status(500).send('error')
  }
}

export default handler;