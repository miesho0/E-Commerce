export async function getAllOrders(cartId: string) {
  const res = await fetch(
  `https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}?sort=paidAt:desc`,
  { cache: "no-store" }
);

  const { data } = await res.json();
  return data;
}

