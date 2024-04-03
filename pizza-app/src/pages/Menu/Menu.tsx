import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
// import MenuCard from "../../components/MenuCard/MenuCard";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";

function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        getMenu(searchValue);
    }, [searchValue]);

    // const getMenu = async () => {
    //     try {
    //         const res = await fetch(`${PREFIX}/products`);
    //         if (!res.ok) {
    //             return;
    //         }
    //         const data = await res.json() as Product[];
    //         setProducts(data);
    //     }
    //     catch (e) {
    //         console.error(e);
    //         return;
    //     }
    // };

    const getMenu = async (searchBy?: string) => {
        try {
            setError(undefined);
            setIsLoading(true);
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name: searchBy
                }
            });
            setProducts(data);
            setIsLoading(false);
        }
        catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const submitSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return <div className={styles["menu"]}>
        <div className={styles["head"]}>
            <Header>Menu</Header>
            <Search id="search" placeholder="Find by name or composition" value={searchValue} onChange={submitSearch}></Search>
        </div>
        <div className={styles["menu-body"]}>
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products} />}
            {isLoading && <>Loading</>}
            {!isLoading && products.length == 0 && <>Dishes not found</>}
        </div>
    </div>;
}

export default Menu;