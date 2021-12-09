import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import axios from "axios";

function ImageUpload({ product_id }) {
    const [images, setImages] = useState([]);
    const maxNumber = 4;

    const onChangeImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    // 추가
    const onError = (errors, files) => {
        if (errors.maxNumber) {
            alert(`이미지는 ${maxNumber}개까지만 첨부할 수 있습니다`);
        }
    };

    const onClick = async () => {
        let body = {
            product_id: 2,
            ...images,
        };
        console.log(body);
        await axios
            .post("/apis/image/product", body)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    // const onClickGetImage = async () => {

    //   let imageList = await axios.get("/apis/image/product").then(res => {

    //     return(res.data.map(data => {
    //       return {
    //         data_url: data.fields.base64_image_url}
    //     }))
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })

    //   console.log(imageList)

    // }

    return (
        <Container>
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
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            사진추가
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>
                            Remove all images
                        </button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img
                                    src={image["data_url"]}
                                    alt=""
                                    width="500"
                                />
                                <div className="image-item__btn-wrapper">
                                    <button
                                        onClick={() => onImageUpdate(index)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => onImageRemove(index)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            <div>
                <Button onClick={onClick}>submit</Button>
            </div>
        </Container>
    );
}

export default ImageUpload;
