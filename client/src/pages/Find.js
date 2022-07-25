import Header from "../components/Header";

const Find = () => {
    
    return(
        <div>
            <Header />
            <form>
                <label for="search">Search:</label>
                <input name="search" id="search" />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Find;