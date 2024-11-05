import { useForm } from 'react-hook-form';

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (v) => {
    console.log(v);
  };

  console.log(errors);

  return (
    <>
      <h1 className='text-3xl text-center font-bold underline'>Hello world!</h1>

      <form className='grid gap-3 p-5' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('first_name', { required: true })}
          className='border border-gray-400 p-2'
          placeholder='First Name'
        />
        {errors.first_name && (
          <p className='text-red-700'>This field is required</p>
        )}

        <input
          {...register('last_name')}
          className='border border-gray-400 p-2'
          placeholder='Last Name'
        />
        <button className='p-2 bg-blue-600 text-white'>Sajili</button>
      </form>
    </>
  );
};

export default App;
