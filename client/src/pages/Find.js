import Header from "../components/Header";
import { useLazyQuery } from '@apollo/client';
import { QUERY_EVENT_SEARCH } from "../utils/queries";
import { useState } from "react";
import SearchList from "../components/SearchList";

const Find = () => {
    const [getSearch, { loading, data }] = useLazyQuery(QUERY_EVENT_SEARCH);

    const [search, setSearch] = useState("");

    const handleFormSubmit = event => {
        event.preventDefault();
        getSearch({ variables: { query: search } })
    }

    return (
        <div>
            <Header />
            <form>
                <label htmlFor="search">Search:</label>
                <input name="search" id="search" onChange={(event) => setSearch(event.target.value)} />
                <button onClick={handleFormSubmit}>Search</button>
            </form>
            <SearchList events={data?.seatGeekQuery.events} />
        </div>
    )
}

export default Find;