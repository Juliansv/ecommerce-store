import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSliderImages from "@/actions/get-slider-images";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Slider from "@/components/slider";
import Container from "@/components/ui/container";


export const revalidate = 0;

const HomePage = async () => {
	const products = await getProducts({ isFeatured: true });
	const slides = await getSliderImages();

	return (
		<Container>
			<div className="space-y-10 pb-10">
				<Slider data={slides}/>
				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					<ProductList title="Featured Products" items={products} />
				S</div>
			</div>
		</Container>
	);
};

export default HomePage;
