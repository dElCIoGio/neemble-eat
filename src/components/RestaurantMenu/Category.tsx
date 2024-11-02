import {MenuItem, Category as CategoryType} from "@/schema.ts";
import {ProductCard} from "@/components/RestaurantMenu/ProductCard.tsx";
import {Product} from "@/components/RestaurantMenu/Product.tsx";


interface props {
	category: CategoryType
	selectItem: (item: MenuItem) => void

}

export function Category({category, selectItem}: props) {
	return (
		<div className={`mt-8 px-4`}>
            <h1 className={`text-2xl font-poppins-semibold laptop:px-4`}>
                {category.name}
            </h1>
            <div className={`laptop:columns-2 gap-0`}>
                {
	                category.items.map((item, index) =>
		                item.availability &&
                        <div key={index}
                             className={`break-inside-avoid laptop:p-3 divide-y divide-gray-200`}
                             onClick={() => selectItem(item)}>
	                        <Product item={item}>
                                <ProductCard item={item}/>
							</Product>
                        </div>
	                )
                }
            </div>


        </div>
	);
}
