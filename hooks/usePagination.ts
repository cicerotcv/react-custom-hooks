import { useCallback, useState } from 'react';

interface IPagination {
  page: number;
  pageSize: number;
}

interface ISorting<T> {
  sortingModel: keyof T;
  sortingOrder: 'asc' | 'desc';
}

interface IInitialValues<DataType> {
  pagination: IPagination;
  sorting: ISorting<DataType>;
}

interface IPaginationFunctions {
  onPageChange(newPage: number): void;
  onPageSizeChange(newSize: number): void;
}

interface ISortingFunctions<T> {
  onSortingModelChange(model: ISorting<T>['sortingModel']): void;
  onSortingOrderChange(newOrder: ISorting<T>['sortingOrder']): void;
}

interface ReturnType<T> {
  data: T[];
  pagination: IPagination & IPaginationFunctions;
  sorting: ISorting<T> & ISortingFunctions<T>;
}

interface IUsePaginationProps<DataType> {
  serviceMethod: Function;
  initialValues: IInitialValues<DataType>;
}

export function usePagination<Data extends Record<string, unknown>>(
  args: IUsePaginationProps<Data>
): ReturnType<Data> {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(args.initialValues.pagination.page);
  const [pageSize, setPageSize] = useState<number>(
    args.initialValues.pagination.pageSize
  );
  const [sortingModel, setSortingModel] = useState<
    ISorting<Data>['sortingModel']
  >(args.initialValues.sorting.sortingModel);
  const [sortingOrder, setSortingOrder] = useState<
    ISorting<keyof Data>['sortingOrder']
  >(args.initialValues.sorting.sortingOrder);

  const onPageChange: IPaginationFunctions['onPageChange'] = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const onPageSizeChange: IPaginationFunctions['onPageSizeChange'] =
    useCallback((newSize: number) => {
      setPageSize(newSize);
    }, []);

  const onSortingModelChange: ISortingFunctions<Data>['onSortingModelChange'] =
    useCallback((model: ISorting<Data>['sortingModel']) => {
      setSortingModel(model);
    }, []);

  const onSortingOrderChange: ISortingFunctions<Data>['onSortingOrderChange'] =
    useCallback((order: ISorting<Data>['sortingOrder']) => {
      setSortingOrder(order);
    }, []);

  return {
    data: data,
    pagination: { page, pageSize, onPageChange, onPageSizeChange },
    sorting: {
      sortingModel,
      sortingOrder,
      onSortingModelChange,
      onSortingOrderChange,
    },
  };
}
