"use client";
import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

export interface ProductCardProps {
	data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
	const cart = useCart();
	const router = useRouter();
	const previewModal = usePreviewModal();

	const [isInCart, setIsInCart] = useState(false);

	const handleClick = () => {
		router.push(`/product/${data?.id}`);
	};

	const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		previewModal.onOpen(data);
	};

	const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		cart.addItem(data);

		setIsInCart(true);
	};

	return (
		<div
			onClick={handleClick}
			className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
		>
			{/* Images and actions */}
			<div className="aspect-square rounded-xl bg-gray-100 relative">
				<Image
					alt="image"
					src={data?.images?.[0]?.url}
					fill
					className="aspect-square object-cover rounded-md"
				/>
				<div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
					<div className="flex gap-x-6 justify-center">
						<IconButton
							onClick={onPreview}
							icon={<Expand size={20} className="text-gray-600" />}
						/>
						{isInCart ? 
							<IconButton
								onClick={onAddToCart}
								icon={<ShoppingCart size={20} className="text-green-600" />}
							/>
						:
							<IconButton
								onClick={onAddToCart}
								icon={<ShoppingCart size={20} className="text-gray-600" />}
							/>
						}
					</div>
				</div>
			</div>
			{/* description */}
			<div>
				<p className="font-semibold text-lg">{data.name}</p>
				<p className="text-sm text-gray-500">{data.category?.name}</p>
			</div>
			{/* price */}
			<div className="flex items-center justify-between">
				<Currency value={data?.price} />
			</div>
		</div>
	);
};

export default ProductCard;
