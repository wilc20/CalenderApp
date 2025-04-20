import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Outlet } from 'react-router-dom';
import classes from './NavLayout.module.css';

const NavLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);

    return (
        <div>
            {!loading && <nav>
                {user && <span>Welcome, {user}!</span>}
                {user && <button className={classes.logout} onClick={logout}>Logout</button>}
            </nav>}
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default NavLayout;