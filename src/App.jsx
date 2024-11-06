import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import Products from './Products';
import Users from './Users';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
      <Toaster position='bottom-right' />
    </QueryClientProvider>
  );
};

export default App;
