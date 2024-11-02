import {useMenuContext} from "@/context/menuContext.ts";
import {CategoriesBar} from "@/components/RestaurantMenu/CategoriesBar.tsx";
import {Category} from "@/components/RestaurantMenu/Category.tsx";
import useCategoriesAutoScroll from "@/hooks/useCategoriesAutoScroll.ts";
import {isCategoryValid} from "@/lib/utils.ts";

export function Categories() {

	const {menu, setSelectedItem} = useMenuContext()

	const {
		refs,
		selectedCategory,
		handleSelectCategory,
		handleMouseLeaveOrUp,
		handleMouseMove,
		handleMouseDown,
		isDragging,
		scrollContainerRef

	} = useCategoriesAutoScroll(menu.categories)

	return (
		<div className={"laptop:bg-zinc-50 laptop:pb-8"}>
            <div className={`sticky top-0 z-50 shadow-md`}>
                <CategoriesBar selectedCategory={selectedCategory}
                               scrollContainerRef={scrollContainerRef}
                               handleSelectCategory={handleSelectCategory}
                               handleMouseMove={handleMouseMove}
                               handleMouseDown={handleMouseDown}
                               handleMouseLeaveOrUp={handleMouseLeaveOrUp}
                               isDragging={isDragging}
                />
            </div>
            <div>
                {
	                menu.categories &&
	                menu.categories.map((category, index) =>
		                isCategoryValid(category) &&
                        <div key={index}
                             className={""}
                             ref={refs[index]}>
                                <Category category={category} selectItem={(item) => setSelectedItem(item)}/>
						</div>
	                )
                }
            </div>
        </div>

	)
}