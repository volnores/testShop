import React, { useEffect } from 'react';
import { getAllProducts, setCurrentPage } from '../store/slices/ProductsSlice';
import { useAppDispatch, useAppSelector } from '../store';
import Error from './Error';
import Loader from './Loader';
import ProductCard from './ProductCard';
import { setSearchByWord, setSelectedCategory } from '../store/slices/FilterSlice';
import { useNavigate } from 'react-router-dom';
import { CREATE_PRUDUCT } from '../utils/Consts';

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading, isLikedProduct, currentPage, productsPerPage } = useAppSelector(
    (state) => state.products,
  );
  const { selectedCategory, searchByWord } = useAppSelector((state) => state.filter);

  const handleChangeByCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchByWord(e.target.value));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (error) return <Error />;
  if (isLoading) return <Loader />;

  if (!Array.isArray(data)) {
    return <div>Нет доступных продуктов.</div>;
  }

  const categories = data.map((item) => item.category);
  const uniqueCategories = Array.from(new Set(categories));

  const filteredProducts = data.filter((item) => {
    const matchesCategory =
      selectedCategory === '' || (selectedCategory === 'Favorite' && isLikedProduct[item.id])
        ? true
        : item.category === selectedCategory;

    const filterSearch = (item?.title?.toLowerCase() || '').includes(
      (searchByWord ?? '').toLowerCase(),
    );

    return matchesCategory && filterSearch;
  });

  const totalProductsCount = filteredProducts.length;
  const totalPages = Math.ceil(totalProductsCount / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          className="m-4 w-full sm:w-60 border-cyan-500 p-2 rounded shadow-md"
          onChange={handleChangeByCategories}>
          <option value="">Все</option>
          <option value="Favorite">Избранное</option>
          {uniqueCategories.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          className="m-4 w-full sm:w-60 border-cyan-500 p-2 rounded shadow-md bg-slate-200 hover:bg-slate-300 transition-colors"
          onClick={() => navigate(CREATE_PRUDUCT)}>
          Создать продукт
        </button>
        <div className="flex justify-between items-center mt-4">
          <button
            className="border p-2 rounded"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}>
            Назад
          </button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            className="border p-2 rounded"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}>
            Вперед
          </button>
        </div>
        <input
          type="text"
          className="m-4 w-full sm:w-60 border-cyan-500 p-2 rounded shadow-md"
          placeholder="Поиск..."
          value={searchByWord}
          onChange={handleChangeSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => <ProductCard key={item.id} {...item} />)
        ) : (
          <div>Нет доступных продуктов для выбранной категории</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
