import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../utils/queries";
import { Link } from "react-router-dom";

const FriendsList = () => {
    const { loading, data } = useQuery(QUERY_FRIENDS);

    if (loading) return "Loading"

    const friends = data.friends.friends

    return(
        <div>
            <h3>Your Friends</h3>
           {friends && friends.map(friend => {
                return (
                    <div key={friend._id}>
                        <h3><Link to={`/user/${friend.username}`}>{friend.username}</Link></h3>
                    </div>
                )
            })} 
        </div>
    )

}

export default FriendsList