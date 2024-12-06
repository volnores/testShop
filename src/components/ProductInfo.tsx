import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getProductInfoById } from '../store/slices/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import Error from './Error';
import { PRODUCTS } from '../utils/Consts';

const ProductInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getProductInfoById(id));
    }
  }, [id, dispatch]);

  const { productIdPage, error, isLoading } = useAppSelector((state) => state.products);

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  if (!productIdPage) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <button
        className="bg-slate-200 hover:bg-slate-300 transition-colors p-2 px-6 rounded mb-8"
        onClick={() => navigate(PRODUCTS)}>
        На Главную
      </button>
      {productIdPage.images && (
        <img
          src={productIdPage.images}
          alt={productIdPage.title}
          className="w-80 h-80 rounded-lg mb-4 object-cover"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{productIdPage.title}</h1>
      <p className="text-green-600">{productIdPage.availabilityStatus}</p>
      <div className="text-gray-600 mb-2">
        <p>
          <strong>Brand:</strong> {productIdPage.brand}
        </p>
        <p>
          <strong>Category:</strong> {productIdPage.category}
        </p>
      </div>
      <p className="text-xl font-bold text-red-600 mb-4">${productIdPage.price.toFixed(2)}</p>
      <p className="text-gray-700">{productIdPage.description}</p>
    </div>
  );
};

export default ProductInfo;
