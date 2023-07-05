import { MASSA_EXEMPLE } from "../const";

function Header() {
    return (
        <header className="text-f-primary w-full flex-col content-center">
            {/* Title and quick presentation of the smart contract related to this front end */}
            <h1 className="mas-banner my-8">{MASSA_EXEMPLE.TITLE}</h1>
            <p className="mas-subtitle my-8 mx-auto w-2/3">
                {MASSA_EXEMPLE.DESCRIPTION}
            </p>
        </header>
    );
}

export default Header;