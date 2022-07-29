import Header from '../components/Header';
import { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import SearchList from '../components/SearchList';
import FriendsList from '../components/FriendsList';

const Together = () => {
    const [getSearch, { loading, data }] = useLazyQuery(QUERY_USER);
    const [addFriend, { data: mutationData, loading: mutationloading, error }] = useMutation(ADD_FRIEND);
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);

    const handleFriendSearch = event => {
        event.preventDefault()
        setSearching(true);
        getSearch({ variables: { username: searchTerm } })
    }

    const handleAddFriend = async (event) => {
        const id = event.target.id.toString();
        const data = await addFriend({ variables: { friendId: id } });
    }

    const renderSearch = (data) => {
        if (!data) {
            return
        } else {
            console.log(data)
            return (
                <div>
                    <h3>{data.user.username}</h3>
                    <button id={data.user._id} onClick={handleAddFriend}>Follow?</button>
                    <SearchList events={data.user.events}></SearchList>
                </div>
            )
        }
    }

    return (
        <div>
            <Header />
            <h1>Go Together!</h1>
            <form onSubmit={handleFriendSearch}>
                <label htmlFor='friend-search'></label>
                <input id='friend-search' onChange={event => setSearchTerm(event.target.value)}></input>
                <button type='submit'>Search</button>
            </form>
            {renderSearch(data)}
            <FriendsList />
        </div>
    )
}

export default Together;