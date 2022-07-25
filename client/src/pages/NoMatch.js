import { Link } from 'react-router-dom';
const NoMatch = () => {
    return(
        <div>
            <h1>Oops! Looks Like the page you wanted couldn't be found!</h1>
            <Link to='/'>Return to Home</Link>
        </div>
    )
};

export default NoMatch;