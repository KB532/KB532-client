import axios from 'axios';

export async function fetchProducts(type, active = true) {
  const { data } = await axios.get(`/api/products`, { params: { type, active } });
  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  return items;
}
