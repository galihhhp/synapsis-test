import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import usersService from 'services/users';

const Dashboard = ({ users }) => {
  const router = useRouter();

  const columns = [
    // ['_id', 'ID'],
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['address', 'Address'],
  ].map(([key, value]) => ({
    name: value,
    selector: (row) => row[key],
    sortable: true,
  }));

  const deleteRow = async (_id) => {
    try {
      return await usersService.deleteUser(_id);
    } catch (error) {
      console.log(error);
    }
  };

  columns.push(
    {
      name: '',
      button: true,
      selector: (row) => row,
      cell: (row) => (
        <button
          className="btn btn-warning"
          onClick={() => {
            router.push({
              pathname: '/dashboard/form',
              query: {
                _id: row._id,
                isUpdate: true,
              }
            });
          }}>
          Edit
        </button>
      ),
    },
    {
      name: '',
      button: true,
      selector: (row) => row._id,
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => deleteRow(row._id) && router.reload()}>
          Delete
        </button>
      ),
    }
  );

  const customStyles = {
    headCells: {
      style: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        // color: '#596877',
      },
    },
    cells: {
      style: {
        fontFamily: 'Poppins',
        fontSize: 16,
        // color: '#596877',
      },
    },
    // rows: {style: {cursor: 'pointer'}},
  };

  return (
    <div className="d-flex flex-column vh-100 px-md-5 mx-5">
      <h1 className="font-weight-bold my-4">Dashboard</h1>
      <div className="d-flex flex-row-reverse w-100 my-2">
        <Link href="/dashboard/form" passHref>
          <button className="btn btn-info p-3 px-5">Add User</button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        pagination
      />
      {users.length > 0 && (
        <div className="d-flex flex-row-reverse w-100 my-2">
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-danger p-3 px-5"
            onClick={() => usersService.deleteAllUser() && router.reload()}
          >
            Delete All User
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const users = await usersService.getAllUsers();

  return {
    props: { users },
  };
}
