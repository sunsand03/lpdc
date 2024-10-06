import Menu from "./Menu";

const Header = () => {
    return (
        <div className="bg-orange-400 w-full flex justify-between items-center p-2">
            <h3>Le Panier des Choco</h3>
            <Menu />
        </div>
    );
}

export default Header;