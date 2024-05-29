import { createPortal } from "react-dom";

const Backdrop = (props) => {
    const { backdropClassName, closeOverlayHandler } = props;

    return (
        <div
            className={`backdrop ${backdropClassName}`}
            onClick={closeOverlayHandler}
        ></div>
    );
};

const Modal = (props) => {
    const { modalClassName, closeOverlayHandler, children, modalPosition } =
        props;
    if (modalPosition) {
        return (
            <div
                className="modal"
                style={{
                    top: modalPosition[1],
                    left: modalPosition[0],
                }}
            >
                {children}
            </div>
        );
    }

    return <div className={`modal ${modalClassName}`}>{children}</div>;
};

const Overlay = (props) => {
    const {
        backdropClassName,
        modalClassName,
        closeOverlayHandler,
        children,
        modalPosition,
        backdropped = true,
    } = props;

    return (
        <>
            {backdropped &&
                createPortal(
                    <Backdrop
                        backdropClassName={backdropClassName}
                        closeOverlayHandler={closeOverlayHandler}
                    />,
                    document.querySelector("#overlay #backdrop")
                )}
            {createPortal(
                <Modal
                    modalClassName={modalClassName}
                    closeOverlayHandler={closeOverlayHandler}
                    modalPosition={modalPosition}
                >
                    {children}
                </Modal>,
                document.querySelector("#overlay #modal")
            )}
        </>
    );
};

export default Overlay;
