import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../utils/Consts';
import { useAppDispatch, useAppSelector } from '../store';
import {
  setChangeBrand,
  setChangeCategory,
  setChangeDescription,
  setChangePrice,
  setChangeTitle,
  setIsOpenModal,
} from '../store/slices/CreateSlice';
import { createProduct, setAddProduct } from '../store/slices/ProductsSlice';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { brand, category, description, images, isOpenModal, price, title } = useAppSelector(
    (state) => state.create,
  );

  const handleSubmit = async () => {
    if (!title || !description || !brand || !category || !price || isNaN(price)) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    const newProduct = {
      availabilityStatus: 'In Stock',
      brand,
      category,
      description,
      id: Date.now(),
      images,
      price,
      title,
    };

    try {
      const createdProduct = await dispatch(createProduct(newProduct)).unwrap();
      dispatch(setAddProduct(createdProduct));
      if (createdProduct) {
        dispatch(setChangeTitle(''));
        dispatch(setChangeDescription(''));
        dispatch(setChangeBrand(''));
        dispatch(setChangeCategory(''));
        dispatch(setChangePrice(0));
        dispatch(setIsOpenModal(false));
      }
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {isOpenModal ? (
          <>
            <button
              className="bg-slate-200 hover:bg-slate-300 transition-colors p-2 px-6 rounded mb-4 w-full"
              onClick={() => navigate(PRODUCTS)}>
              На Главную
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 hover:text-white transition-colors p-2 px-6 rounded mb-4 w-full"
              onClick={() => dispatch(setIsOpenModal(false))}>
              Закрыть окно
            </button>
            <h2 className="text-lg font-semibold mb-4">Создание продукта</h2>
            <input
              type="text"
              placeholder="Название"
              value={title}
              onChange={(e) => dispatch(setChangeTitle(e.target.value))}
              className="bg-slate-300 border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Описание"
              value={description}
              onChange={(e) => dispatch(setChangeDescription(e.target.value))}
              className="bg-slate-300 border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Бренд"
              value={brand}
              onChange={(e) => dispatch(setChangeBrand(e.target.value))}
              className="bg-slate-300 border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Категория"
              value={category}
              onChange={(e) => dispatch(setChangeCategory(e.target.value))}
              className="bg-slate-300 border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Цена"
              value={price}
              onChange={(e) => dispatch(setChangePrice(+e.target.value))}
              className="bg-slate-300 border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-200 hover:bg-blue-300 transition-colors p-2 px-6 rounded w-full"
              onClick={handleSubmit}>
              Создать продукт
            </button>
          </>
        ) : (
          <button
            className="bg-blue-200 hover:bg-blue-300 transition-colors p-2 px-6 rounded w-full"
            onClick={() => dispatch(setIsOpenModal(true))}>
            Открыть меню
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
