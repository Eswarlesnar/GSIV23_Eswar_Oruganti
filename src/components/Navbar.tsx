import  { FC, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import debounce from "lodash.debounce";
import "./navbar.css";
import { useAppDispatch } from "../hooks";
import { setFilter } from "../app/moviesSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const findMovies = () => {
    dispatch(setFilter(searchValue));
  };

  const debouncedResults = debounce(findMovies, 900);

  useEffect(() => {
    debouncedResults();
    return () => debouncedResults.cancel();
  }, [searchValue , debouncedResults]);

  return (
    <nav className="navbar">
      {location.pathname === "/" && (
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <span className="search-icon">
            <BsSearch />
          </span>
        </div>
      )}
      <div className="logo">
        <button onClick={() => navigate("/")}>
          <HiOutlineHome className="logo-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
