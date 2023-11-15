import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
	items: Product[];
	addItem: (data: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addItem: (data: Product) => {
				const currentItems = get().items;
				const existingItem = currentItems.find((item) => item.id === data.id);

				if (existingItem) {
					(!existingItem.quantityCart ? existingItem.quantityCart = 2 : existingItem.quantityCart ++)
					return toast.success("Item added");
				} else {
					data.quantityCart = 1
				}


				set({ items: [...get().items, data] });
				toast.success("Item added to cart");
			},
			removeItem: (id: string) => {
				const filteredItems = get().items.filter((item) => {
					if (item.id == id) {
						item.quantityCart = 0
						return false
					}
					return true
				})
				set({ items: filteredItems });
				toast.success("Item deleted from the cart");
			},
			removeAll: () => {
				set({items: []})
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useCart;
