import Auth from '../utils/auth';

import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <div className='header-container'>
                <img
                    src={require('../assets/go-together-banner-cropped-small.jpg')}
                    alt='Concert'
                    className='header-img'
                ></img>
                <h1 className='header-text'>Go Together</h1>
            </div>
            <header>
                <nav>
                    <ul>
                        <li className='nav'><Link to='/'>Go</Link></li>
                        <li className='nav'><Link to='/find'>Find</Link></li>
                        <li className='nav'><Link to='/together'>Together</Link></li>
                        <li><button 
                        onClick={() => Auth.logout()}
                        className='btn btn-secondary nav-btn'
                        >Logoff</button></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
};

export default Header;