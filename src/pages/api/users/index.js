import clientPromise from 'lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('synapsis');

  switch (req.method) {
    case 'POST':
      try {
        let newPost = await db.collection('users').insertOne(req.body);
        return res.json({
          message: 'Post added successfully',
          status: 200,
          success: true,
          data: newPost,
        });
      } catch (error) {
        return res.json({
          message: 'Error: ' + error.message,
          status: 500,
          success: false,
          data: error,
        });
      }
    case 'GET':
      try {
        const users = await db.collection('users').find({}).toArray();
        return res.json({
          message: 'Users found successfully',
          status: 200,
          data: users,
        });
      } catch (error) {
        return res.json({
          message: 'Error: ' + error.message,
          status: 500,
          success: false,
          data: error,
        });
      }
    case 'DELETE':
      try { 
        const deleteAll = await db.collection('users').deleteMany({});
        return res.json({
          message: 'All users deleted successfully',
          status: 200,
          success: true,
          data: deleteAll,
        });
      } catch (error) { 
        return res.json({
          message: 'Error: ' + error.message,
          status: 500,
          success: false,
          data: error,
        });
      }
    default:
      return res.json({
        message: 'Method not allowed',
        status: 405,
        success: false,
      });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};