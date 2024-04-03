import MenuCard from "../../../components/MenuCard/MenuCard";
import { MenuListProps } from "./MenuList.props";

function MenuList({ products }: MenuListProps) {
    return products.map(item => {
        return <MenuCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            rate={item.rating}
            imgSrc={item.image}
            composition={item.ingredients.join(", ")}
        />;
    });
}

export default MenuList;