
const SearchBar = () => (
    <form action="/" method="get">
        <div className="searchbar">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search courses</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search Courses"
                name="s" 
            />
            <button size="lg" style={{height: '10', width : '50px'}} type="submit">Enter</button>
        </div>
        
    </form>
);


export default SearchBar;