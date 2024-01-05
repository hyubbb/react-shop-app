interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
  quantity: number;
  total: number;
  title: string;
}
