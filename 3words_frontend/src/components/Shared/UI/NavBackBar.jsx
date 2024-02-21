const NavBackBar = (props) => {
    const { pageCloseHandler } = props;

    return (
        <nav className="nav-bar" onClick={pageCloseHandler}>
            BACK
        </nav>
    );
};

export default NavBackBar;
