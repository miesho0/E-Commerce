export default async function getProductsByBrand(brandId: string) {
  const response = await fetch( `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,)
  const { data } = await response.json()
  return data
}