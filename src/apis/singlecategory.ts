// apis/productsByCategory.ts
export default async function getcategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    { cache: "no-store" } 
  )
  const { data } = await response.json()
  return data
}