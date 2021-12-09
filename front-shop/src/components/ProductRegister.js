import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import { CategoryDirection } from "./CategoryBanner";
import AreaButton from "./AreaButton";
import Modal from "./Modal";

function ProductRegister({ history }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    const [area, setArea] = useState("지역을 선택해 주세요");
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));
    const { kind } = useSelector((state) => ({
        kind: state.category.payload,
    }));
    const [images, setImages] = useState([]);
    const maxNumber = 4;

    const onChangeImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const onError = (errors, files) => {
        if (errors.maxNumber) {
            alert(`이미지는 ${maxNumber}개까지만 첨부할 수 있습니다`);
        }
    };

    const displayCategory = kind.map((k, index) => {
        return <option>{k.kind}</option>;
    });

    const [product, setProduct] = useState({
        name: "",
        category: kind[0].kind,
        price: null,
        quantity: 1,
        description: "",
    });

    const { name, category, price, quantity, description } = product;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const onChangeArea = (e) => {
        const { name, value } = e.target;
        setArea(value);
    };

    const onClickHandler = (e) => {
        let category_id = kind[kind.findIndex((k) => k.kind === category)].pk;
        let image_list = images.map((img, index) => img.data_url);
        e.preventDefault();

        if (
            !(
                name &&
                category_id &&
                price &&
                quantity &&
                description &&
                image_list.length
            )
        ) {
            setModalOpen(true);
            setModalContents("모든 항목을 입력해 주세요");
            return;
        }
        if (
            area == undefined ||
            area == null ||
            area == "지역을 선택해 주세요"
        ) {
            setModalOpen(true);
            setModalContents("거래 지역을 선택해 주세요");
            return;
        }
        const body = {
            seller_id: userData.user_id,
            name: name,
            category_id: category_id,
            price: price,
            quantity: quantity,
            area: area,
            description: description,
            ...image_list, // 용량이 크면 안넘어가
        };

        axios
            .post("/apis/v1/product", body)
            .then((response) => {
                history.replace("/");
            })
            .catch((e) => {
                setModalOpen(true);
                setModalContents(
                    "상품 등록에 실패하였습니다. 관리자에게 문의하세요."
                );
            });
    };

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>

            <Container>
                <CategoryDirection tag1={"판매하기"}></CategoryDirection>
                <br />
                <div style={{ fontSize: "1.3rem" }}>
                    <Row>
                        <Col
                            lg={{ span: 11, offset: 2 }}
                            sm={{ span: 12, offset: 0 }}
                            xs={{ span: 12 }}
                        >
                            <Form>
                                <Form.Group
                                    controlId="exampleForm.ControlSelect1"
                                    as={Row}
                                >
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        카테고리
                                    </Form.Label>
                                    <Col sm="2" xs="8">
                                        <Form.Control
                                            as="select"
                                            name="category"
                                            onChange={onChangeHandler}
                                            value={category}
                                        >
                                            {displayCategory}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    controlId="exampleForm.ControlInput1"
                                    as={Row}
                                >
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        상품명
                                    </Form.Label>
                                    <Col sm="10" lg="8" xs="8">
                                        <Form.Control
                                            name="name"
                                            value={name}
                                            onChange={onChangeHandler}
                                            placeholder="상품명을 적어주세요"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    controlId="exampleForm.ControlInput1"
                                    as={Row}
                                >
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        가격
                                    </Form.Label>
                                    <Col sm="4" lg="2" xs="7">
                                        <Form.Control
                                            name="price"
                                            value={price}
                                            onChange={onChangeHandler}
                                            placeholder="가격을 적어주세요"
                                        />
                                    </Col>
                                    <Col xs="1">
                                        <p>₩</p>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    controlId="exampleForm.ControlInput1"
                                    as={Row}
                                >
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        수량
                                    </Form.Label>
                                    <Col sm="2" lg="1" xs="8">
                                        <Form.Control
                                            name="quantity"
                                            value={quantity}
                                            onChange={onChangeHandler}
                                            placeholder="수량을 적어주세요"
                                        />
                                    </Col>
                                </Form.Group>

                                <Row>
                                    <Col
                                        sm="2"
                                        lg="1"
                                        xs="4"
                                        style={{ paddingTop: 20 }}
                                    >
                                        거래 지역
                                    </Col>
                                    <Col
                                        sm="6"
                                        lg="6"
                                        xs="6"
                                        style={{ paddingTop: 8 }}
                                    >
                                        <AreaButton
                                            onChange={onChangeArea}
                                            area={area}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group
                                    controlId="exampleForm.ControlTextarea1"
                                    as={Row}
                                >
                                    <Form.Label column sm="2" lg="1">
                                        상품설명
                                    </Form.Label>
                                    <Col sm="10" lg="8">
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            onChange={onChangeHandler}
                                            name="description"
                                            placeholder="상품 설명을 적어주세요"
                                            value={description}
                                        />
                                    </Col>
                                </Form.Group>
                                <br />
                                <Form.Group
                                    controlId="exampleForm.ControlTextarea1"
                                    as={Row}
                                >
                                    <Form.Label>상품 이미지 등록</Form.Label>
                                    {/* <Button onClick={onClickGetImage}>이미지 가져오기 </Button> */}

                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChangeImage}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                        onError={onError} // 추가
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI

                                            <div className="upload__image-wrapper">
                                                <br />
                                                <Button
                                                    variant="outline-light"
                                                    style={{
                                                        background: "#e85255",
                                                        fontSize: "1.3rem",
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        onImageUpload();
                                                    }}
                                                    {...dragProps}
                                                >
                                                    사진 추가
                                                </Button>
                                                <br />
                                                &nbsp;
                                                {imageList.map(
                                                    (image, index) => (
                                                        <div
                                                            key={index}
                                                            className="image-item"
                                                        >
                                                            <img
                                                                src={
                                                                    image[
                                                                        "data_url"
                                                                    ]
                                                                }
                                                                alt=""
                                                                width="700"
                                                            />
                                                            <div className="image-item__btn-wrapper">
                                                                <br />
                                                                <Button
                                                                    variant="outline-light"
                                                                    style={{
                                                                        background:
                                                                            "#e85255",
                                                                        fontSize:
                                                                            "1.3rem",
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        onImageUpdate(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    수정
                                                                </Button>{" "}
                                                                <Button
                                                                    variant="outline-light"
                                                                    style={{
                                                                        background:
                                                                            "#e85255",
                                                                        fontSize:
                                                                            "1.3rem",
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        onImageRemove(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    삭제
                                                                </Button>
                                                            </div>
                                                            <br />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </ImageUploading>
                                    <Col>
                                        <p>
                                            {`이미지는 최대 ${maxNumber}개까지만 첨부할 수 있습니다`}
                                        </p>
                                        <br />
                                    </Col>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="outline-light"
                                    style={{
                                        background: "#e85255",
                                        fontSize: "1.3rem",
                                    }}
                                    onClick={onClickHandler}
                                >
                                    상품 등록
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default ProductRegister;
