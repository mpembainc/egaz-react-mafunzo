import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUser, updateUser } from '../services/user-service';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const UserForm = ({ selected, onCancel }) => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (selected) {
      setValue('first_name', selected.first_name);
      setValue('last_name', selected.last_name);
      setValue('phone', selected.phone);
    }
  }, [selected]);

  const queryClient = useQueryClient();

  const postUserMutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      toast.success('User has been added');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (value) => updateUser(value, selected.id),
    onSuccess: () => {
      toast.success('User has been updated');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
      onCancel();
    },
  });

  const onSubmit = (v) => {
    if (selected) updateUserMutation.mutate(v);
    else postUserMutation.mutate(v);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-5 grid grid-cols-4 gap-5 border shadow-md'
    >
      <Input control={control} name='first_name' placeholder='First Name' />
      <Input control={control} name='last_name' placeholder='Last Name' />
      <Input control={control} name='phone' placeholder='Phone Number' />

      <div className='space-x-1'>
        <Button>{selected ? 'Update' : 'Save'}</Button>
        {selected && (
          <Button
            type='button'
            onClick={() => {
              reset();
              onCancel();
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
