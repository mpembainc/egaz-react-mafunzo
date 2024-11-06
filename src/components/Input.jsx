import { useController } from 'react-hook-form';

const Input = ({ name, control, ...props }) => {
  const { field } = useController({ name, control });

  return (
    <input
      {...field}
      {...props}
      className='rounded border-gray-300 border-2 focus:outline-none p-2 w-full'
    />
  );
};

export default Input;
