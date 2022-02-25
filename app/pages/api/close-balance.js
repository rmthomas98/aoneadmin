import clientPromise from '../../lib/mongodb';

const handler = async (req, res) => {
  try {
    // get data from frontend
    const magic = req.body.magic;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('balances');

    // delete document from mongodb
    await collection.remove({magic: magic});

    // send response back to front end
    res.status(200).send('balance cleared')

  } catch {
    res.status(500).send('error')
  }
}

export default handler;