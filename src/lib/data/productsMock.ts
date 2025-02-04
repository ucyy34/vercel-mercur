'use server';

import { v4 as uuidv4 } from 'uuid';
import { sortProducts } from '@/lib/helpers/sort-productsMock';
import { HttpTypes } from '@medusajs/types';
import { Product, SortOptions } from '@/types/product';
import { products } from '@/data/productsMock';

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
  sold,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
  countryCode?: string;
  regionId?: string;
  sold: boolean;
}): Promise<{
  response: {
    products: Product[];
    count: number;
  };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error(
      'Country code or region ID is required'
    );
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = (_pageParam - 1) * limit;

  const productsMock = [
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
    ...products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
  ].filter((item) => item.sold === sold);

  const count = productsMock.length;

  const nextPage =
    count > offset + limit ? pageParam + 1 : null;

  return {
    response: {
      products: productsMock,
      count: count,
    },
    nextPage: nextPage,
  };
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = 'created_at',
  countryCode,
  sold = false,
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
  countryCode: string;
  sold: boolean;
}): Promise<{
  response: {
    products: Product[];
    count: number;
    pages: number;
  };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams &
    HttpTypes.StoreProductParams;
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
    sold,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage =
    count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(
    pageParam,
    pageParam + limit
  );

  const pages = Math.ceil(products.length / 12);

  return {
    response: {
      products: paginatedProducts,
      count,
      pages,
    },
    nextPage,
    queryParams,
  };
};
