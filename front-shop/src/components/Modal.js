import React from "react";
import "../assets/css/modal.css";

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, btnName, customBtn } = props;
    let header = "My Shopping Mall says";

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            {" "}
                            &times;{" "}
                        </button>
                    </header>
                    <main style={{ fontSize: "1.3rem" }}>{props.children}</main>
                    <footer>
                        <button
                            className="close"
                            onClick={customBtn ? customBtn : close}
                        >
                            {" "}
                            {btnName ? btnName : "close"}{" "}
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;
