import Auth from '../utils/auth';

const Header = () => {

    return (
        <div>
            <div>
                <h1>Go Together</h1>
            </div>
            <header>
                <nav>
                    <ul>
                        <li>Go</li>
                        <li>Find</li>
                        <li>Together</li>
                        <li><button onClick={Auth.logout()}>Logoff</button></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
};

export default Header;