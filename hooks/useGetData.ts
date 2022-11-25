import { useEffect } from 'react';
import { Category, Item, server } from '../pages/index';

export default function useGetData(
  setItems: (items: Item[]) => void,
  setCategories: (categories: Category[]) => void,
  refetch: boolean,
) {
  useEffect(() => {
    fetch(`${server}items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cors: 'no-cors',
        AccessControlAllowOrigin: '*',
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))

      .catch((err) => console.log(err));
    fetch(`${server}categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cors: 'no-cors',
        AccessControlAllowOrigin: '*',
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, [refetch]);
}
