
const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

export function getImageUrl(id: string): string {
  return `${API_IMAGE_URL}/uploads/${id}`;
}

export function getImageFromApi(id: number): string {
  return `https://images.ygoprodeck.com/images/cards_small/${id}.jpg`;
}