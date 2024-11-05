import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const getProducts = () => axios.get('http://localhost:3000/products');
const addProduct = (product) =>
  axios.post('http://localhost:3000/products', product);
const deleteProduct = (id) =>
  axios.delete(`http://localhost:3000/products/${id}`);

const Products = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60,
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addNewProduct = () => {
    postMutation.mutate({
      id: 19,
      title: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
      description:
        '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    });
  };

  if (isFetching) return <div>Loding...</div>;

  return (
    <div className='p-5 space-y-5'>
      <button
        onClick={addNewProduct}
        className='bg-orange-600 rounded text-white py-2 px-4'
      >
        Add new
      </button>

      <div className='grid grid-cols-4 gap-5'>
        {data.data.map((product) => (
          <div key={product.id} className='bg-white border p-4'>
            <img src={product.image} className='w-full h-48 object-contain' />
            <div className='text-center mt-5'>
              <p>{product.title}</p>
              <p>${product.price}</p>

              <button
                onClick={() => deleteMutation.mutate(product.id)}
                className='bg-red-100 text-red-500 rounded-full border border-red-400 py-1 mt-4 px-7'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
