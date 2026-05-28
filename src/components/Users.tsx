import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
    id: number;
    name: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const resp = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                // console.log(resp.data);
                isMounted && setUsers(resp.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
            navigate('/login', {state: {from: location}, replace: true });
        }
    }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.name}</li>)}
                    </ul>
                ) : <p>No users to display</p>

            }
        </article>
    );
};

export default Users;