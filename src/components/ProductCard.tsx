import { deleteProduct, IProduct, setIsLikedProduct } from '../store/slices/ProductsSlice';
import Like from '../icons/like';
import LikeRed from '../icons/likeRed';
import { useAppDispatch, useAppSelector } from '../store';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRODUCT_ID_PAGE } from '../utils/Consts';

const ProductCard: React.FC<IProduct> = ({ id, title, brand, category, price, images }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLikedProduct = useAppSelector((state) => state.products.isLikedProduct[id] || false);

  const handleChangeLike = () => {
    dispatch(setIsLikedProduct({ id, isLikedProduct: !isLikedProduct }));
  };

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      alert('Не удалось удалить продукт. Попробуйте еще раз.');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-4 relative w-72 h-100 ">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleChangeLike}>
        {isLikedProduct ? <LikeRed /> : <Like />}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => navigate(generatePath(PRODUCT_ID_PAGE, { id: id.toString() }))}>
        <img src={images[0]} alt={title} className="h-56 object-cover rounded-t-lg mx-auto" />
        <div className="mt-2 h-20 overflow-hidden">
          <h2 className="text-lg font-semibold  truncate whitespace-nowrap">{title}</h2>
          <div className="text-sm text-gray-500">{category}</div>
          <div className="text-sm text-gray-600">{brand}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg">{price}</div>

        <button
          className="bg-slate-200 hover:bg-slate-300 transition-colors p-2 px-6 rounded"
          onClick={handleDeleteProduct}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
