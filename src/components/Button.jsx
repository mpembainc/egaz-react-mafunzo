const Button = ({ children, ...props }) => {
  return (
    <button {...props} className='bg-blue-500 text-white px-5 py-2 rounded'>
      {children}
    </button>
  );
};

export default Button;
