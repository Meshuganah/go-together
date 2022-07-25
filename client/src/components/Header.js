import Auth from '../utils/auth';

import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <div>
                <h1>Go Together</h1>
            </div>
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Go</Link></li>
                        <li><Link to='/find'>Find</Link></li>
                        <li><Link to='/together'>Together</Link></li>
                        <li><button onClick={() => Auth.logout()}>Logoff</button></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
};

export default Header;