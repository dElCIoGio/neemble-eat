import React, {useCallback, useRef, useState} from "react";
import {Category} from "../schema.ts";


export function useCategoriesAutoScroll(categories: Category[] | undefined) {

	const [refs] = useState<React.RefObject<HTMLDivElement>[]>(() =>
		categories ? categories.map(() => React.createRef<HTMLDivElement>()) : []
	);

	const [selectedCategory, setSelectedCategory] = useState<Category>()
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);


	const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (scrollContainerRef.current) {
			setIsDragging(true);
			setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
			setScrollLeft(scrollContainerRef.current.scrollLeft);
		}
	}, []);

	const handleMouseLeaveOrUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2; // Scroll-fast
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	}, [isDragging, startX, scrollLeft]);

	const scrollToCategory = useCallback((index: number) => {
		if (refs[index] && refs[index].current) {
			const element = refs[index].current;
			const yOffset = -55; // Adjust this value as needed
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	}, [refs]);

	const handleSelectCategory = useCallback((category: Category, index: number) => {
		setSelectedCategory(category);
		scrollToCategory(index);
	}, [scrollToCategory]);

	//useEffect(() => {
	//	const handleScroll = () => {
	//		const scrollPosition = window.scrollY;
	//		let currentCategory: Category | undefined;
//
	//		refs.forEach((ref, index) => {
	//			if (ref.current) {
	//				const top = ref.current.offsetTop - 100;
	//				const bottom = top + ref.current.offsetHeight;
	//				if (scrollPosition >= top && scrollPosition <= bottom) {
	//					currentCategory = categories ? categories[index] : undefined;
	//				}
	//			}
	//		});
//
	//		if (currentCategory && currentCategory !== selectedCategory) {
	//			setSelectedCategory(currentCategory);
	//		}
	//	};
//
	//	// Add and remove the scroll listener
	//	window.addEventListener('scroll', handleScroll);
	//	return () => {
	//		window.removeEventListener('scroll', handleScroll);
	//	};
	//}, [selectedCategory, categories, refs]);

	return {
		refs,
		selectedCategory,
		handleSelectCategory,
		handleMouseDown,
		handleMouseLeaveOrUp,
		handleMouseMove,
		isDragging,
		scrollContainerRef
	};

}

export default useCategoriesAutoScroll;