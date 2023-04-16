/** TODO: APIにリクエストするように書き換える */

const categoryIdToFormIdMap: { [key: number]: number } = {
  76: 2, // 推しの子
};
export default function fetchFormIdFromCategoryId(
  categoryId: number
): number | null {
  return categoryIdToFormIdMap[categoryId] || null;
}
