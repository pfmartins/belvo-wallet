import { Link } from 'react-router-dom';

import './NotFound.css';
import img from '../../assets/error-404.jpeg';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found__page">Page not found. <br /><span>Error 404</span></div>
            <Link to="/"><img src={img} alt="Error 404" width="400" /></Link>
        </div>
    )
}

export default NotFound;