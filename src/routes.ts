import ProductCreate from './pages/ProductCreate';
import ProductIdPage from './pages/ProductIdPage';
import Products from './pages/Products';
import { CREATE_PRUDUCT, PRODUCT_ID_PAGE, PRODUCTS } from './utils/Consts';

export const publicRoutes = [
  { path: PRODUCTS, element: Products },
  { path: PRODUCT_ID_PAGE, element: ProductIdPage },
  { path: CREATE_PRUDUCT, element: ProductCreate },
];
