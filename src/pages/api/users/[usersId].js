import clientPromise from 'lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { usersId },
    method,
    body,
  } = req;

  const client = await clientPromise;
  const db = client.db('synapsis');
  switch (method) {
    case 'DELETE':
      try {
        const deleted = await db
          .collection('users')
          .deleteOne({ _id: usersId });
        return res.json({
          message: 'User deleted successfully',
          status: 200,
          success: true,
          data: deleted,
        });
      } catch (error) {
        return res.json({
          message: 'Error: ' + error.message,
          status: 500,
          success: false,
        });
      }
    case 'PUT':
      try {
        const updated = await db.collection('users').updateOne(
          { _id: usersId },
          { $set: body },
          // { new: true },
        );
        return res.json({
          message: 'User updated successfully',
          status: 200,
          success: true,
          data: updated,
        });
      } catch (error) {
        return res.json({
          message: 'Error: ' + error.message,
          status: 500,
          success: false,
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
