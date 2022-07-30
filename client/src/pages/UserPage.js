import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import SearchList from "../components/SearchList";
import FriendsList from "../components/FriendsList";

const UserPage = () => {
    const params = useParams()
    console.log(params.username);
    const { data, loading } = useQuery(QUERY_USER, { variables: { username: params.username }});

    if (loading) return "Loading";

    console.log(data)
    return(
        <div>
            <Header />
            <div className="text-center">
                <h1>{data.user.username}</h1>
                <h2>Events</h2>
            </div>
            <SearchList events={data.user.events}></SearchList>
        </div>
    )
}

export default UserPage;