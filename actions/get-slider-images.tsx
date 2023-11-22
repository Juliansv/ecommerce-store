import { Slides } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sliders`;

const getSliderImages = async (): Promise<Slides[]> => {
	const res = await fetch(`${URL}`, { cache: "no-store" });

	return res.json();
};

export default getSliderImages;
