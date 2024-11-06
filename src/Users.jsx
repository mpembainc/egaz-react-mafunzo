import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserForm from './components/UserForm';
import { deleteUser, getUsers } from './services/user-service';
import Table from './components/Table';
import Button from './components/Button';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

function Users() {
  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [selectedUser, setSelectedUser] = useState();
  const queryClient = useQueryClient();

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorFn: (_, index) => index + 1,
      },
      {
        header: 'First Name',
        accessorKey: 'first_name',
      },
      {
        header: 'Last Name',
        accessorKey: 'last_name',
      },
      {
        header: 'Phone Number',
        accessorKey: 'phone',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='space-x-1'>
            <Button onClick={() => setSelectedUser(row.original)}>Edit</Button>
            <Button onClick={() => handleDelete(row.original.id)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = (userId) => {
    deleteUser(userId).then(() => {
      toast.success('User has been deleted');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    });
  };

  if (isFetching) return <div>Loding...</div>;

  return (
    <div className='p-10'>
      <UserForm
        selected={selectedUser}
        onCancel={() => setSelectedUser(undefined)}
      />

      {/* <div>Total: {data.data.length}</div> */}
      <div className='p-6 border rounded-md mt-10'>
        <div className='text-2xl'>Users</div>
        <p className='text-gray-500 mb-5'>
          A list of all the users in your account including their name, title,
          email and role. Add user
        </p>
        <Table data={data.data} columns={columns} />
      </div>
    </div>
  );
}

export default Users;
