import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface Product {
  id: bigint;
  name: string;
  description: string;
  emoji: string;
  pricePerCap: bigint;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Green Apple Fizz",
    emoji: "🍏",
    pricePerCap: 45n,
    description:
      "A crisp and refreshing drink bursting with the tangy sweetness of green apples. When the cap is activated, the vibrant apple powder mixes instantly with water to create a lightly fizzy, energizing beverage perfect for hot days or quick refreshment on the go.",
  },
  {
    id: 2n,
    name: "Apple Splash Drink",
    emoji: "🍎",
    pricePerCap: 40n,
    description:
      "A smooth and naturally sweet apple-flavored drink that delivers a juicy burst of orchard-fresh flavor. Apple Splash is designed to provide a balanced taste that is both refreshing and satisfying with every sip.",
  },
  {
    id: 3n,
    name: "Pomegranate Burst Drink",
    emoji: "❤️",
    pricePerCap: 44n,
    description:
      "A bold and fruity beverage inspired by the rich flavor of fresh pomegranates. With its slightly tart and naturally vibrant taste, Pomegranate Burst offers a refreshing drink experience packed with fruity intensity.",
  },
  {
    id: 4n,
    name: "Lychee Blossom Drink",
    emoji: "🌸",
    pricePerCap: 42n,
    description:
      "A delicate and aromatic beverage featuring the exotic sweetness of lychee fruit. Lychee Blossom delivers a light, floral flavor profile that feels refreshing, elegant, and perfect for a unique drink experience.",
  },
  {
    id: 5n,
    name: "Cranberry Refresher",
    emoji: "🍒",
    pricePerCap: 46n,
    description:
      "A tangy and revitalizing drink crafted with the bold taste of cranberries. Cranberry Refresher offers a refreshing balance of sweet and tart notes, making it ideal for a crisp and energizing beverage.",
  },
  {
    id: 6n,
    name: "Lemon Mint Refresher",
    emoji: "🍋",
    pricePerCap: 40n,
    description:
      "A cooling combination of zesty lemon and fresh mint flavors. This refreshing blend provides a clean, invigorating taste that instantly revitalizes and hydrates, making it perfect for summer refreshment.",
  },
  {
    id: 7n,
    name: "Strawberry Spark Pop",
    emoji: "🍓",
    pricePerCap: 45n,
    description:
      "A fun and fruity drink bursting with the sweet flavor of ripe strawberries. With a light sparkling effect, Strawberry Spark Pop delivers a vibrant and playful beverage that appeals to all age groups.",
  },
  {
    id: 8n,
    name: "Grape Blast Fizz",
    emoji: "🍇",
    pricePerCap: 44n,
    description:
      "A bold and juicy grape-flavored drink with a lively fizz. Grape Blast Fizz combines sweetness and sparkle to create a vibrant and refreshing beverage experience.",
  },
  {
    id: 9n,
    name: "Pineapple Sparkle Fizz",
    emoji: "🍍",
    pricePerCap: 43n,
    description:
      "A tropical drink packed with the bright and tangy taste of fresh pineapple. Pineapple Sparkle Fizz delivers a refreshing tropical burst with a light fizz that instantly uplifts your mood.",
  },
  {
    id: 10n,
    name: "Berry Boom Fizz",
    emoji: "🫐",
    pricePerCap: 46n,
    description:
      "A delicious mix of berries that creates a rich, fruity explosion of flavor. Berry Boom Fizz combines sweet and slightly tart berry notes with a sparkling twist for an exciting and refreshing drink.",
  },
];

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return FALLBACK_PRODUCTS;
      try {
        await actor.initialize();
        const products = await actor.getAllProducts();
        if (!products || products.length === 0) return FALLBACK_PRODUCTS;
        return products;
      } catch {
        return FALLBACK_PRODUCTS;
      }
    },
    enabled: !isFetching,
    initialData: FALLBACK_PRODUCTS,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(productId, quantity);
    },
  });
}
