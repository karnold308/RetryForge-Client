
import axios from '../api/axios'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

const AUTH_URL = '/auth'

const useLogout = () => {
    const { setAuth, setPersist } = useAuth()
    const navigate = useNavigate()

    return async (isTimeout = false) => {

        setAuth(null);

        if (!isTimeout) {
            localStorage.removeItem('persist')
            setPersist(false)
        }

        try {


            await axios.post(`${AUTH_URL}/logout`, {}, {
                withCredentials: true
            });
        } catch (e) {
            console.log(e)
        } finally {
            navigate('/', {
                replace: true,
                state: isTimeout ? { reason: 'timeout' } : undefined
            });
        }

    }
}

export default useLogout
