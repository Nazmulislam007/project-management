import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

export default function useAuthChcek() {
    const [authAvailable, setAuthAvailable] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const auth = JSON.parse(data);

            if (auth?.accessToken && auth?.user) {
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user
                    })
                );
            }
        }
        setAuthAvailable(true);
    }, [dispatch]);

    return authAvailable;
}
