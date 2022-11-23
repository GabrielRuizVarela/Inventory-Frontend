import { useEffect } from 'react';
import { Category, Item, server } from '../pages/index';

export default function useGetData(
  setItems: (items: Item[]) => void,
  setCategories: (categories: Category[]) => void,
  refetch: boolean,
) {
  useEffect(() => {
    fetch(`${server}/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.log(err));
    fetch(`${server}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err));
  }, [refetch]);
}
