import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { EmptyCheckProductByCategory } from "./EmptyCheck";
import { CategoryDirection } from "./CategoryBanner";

function ProductByCategory({ match }) {
    const { kind } = useSelector((state) => ({
        kind: state.category.payload,
    }));
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        let res = await axios.get("/apis/v1/category/" + match.params.number);
        let filtered_product_list = res.data.payload.filter(
            (product) => product.valid == true
        );
        let product_list = filtered_product_list.map((data) => {
            return {
                ...data,
                id: data.pk,
            };
        });
        setProducts(product_list);
    };

    useEffect(() => {
        fetchProducts();
    }, [match.params.number]);

    return (
        <div>
            <Container>
                <CategoryDirection
                    tag1={
                        kind[kind.findIndex((k) => k.pk == match.params.number)]
                            .kind
                    }
                ></CategoryDirection>

                <EmptyCheckProductByCategory
                    text="등록된 물건이 없습니다."
                    items={products}
                ></EmptyCheckProductByCategory>
            </Container>
        </div>
    );
}

export default ProductByCategory;
