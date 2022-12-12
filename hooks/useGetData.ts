import { useEffect, useState } from 'react';
import { Category, Item, server } from '../pages/index';

export default function useGetData(
  setItems: (items: Item[]) => void,
  setCategories: (categories: Category[]) => void,
  refetch: boolean,
) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch(`${server}items`, {
          method: 'GET',
        });
        const itemsData = await itemsResponse.json();
        console.log(itemsData);
        setItems(itemsData);

        const categoriesResponse = await fetch(`${server}categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (err) {
        console.log(err);
      }
    };
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [refetch]);
}
