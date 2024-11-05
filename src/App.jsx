import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Products from './Products';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
    </QueryClientProvider>
  );
};

export default App;
