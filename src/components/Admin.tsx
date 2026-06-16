import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
    return (
        <section className="pb-24 border-t border-gray-200/70">
            <h1>Admins page</h1>
            <br/>
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}