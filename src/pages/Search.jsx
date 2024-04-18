import React, { useEffect, useState } from "react";
import Flex from "../components/Layouts/Flex";
import { axiosClient } from "../utils/axiosClient";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  async function searchProducts(query) {
    try {
      const response = await axiosClient.post(`/api/hyart/search-product`, { query });
      console.log(response);
      setSearchResults(response.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLinkClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchQuery)
      searchProducts(searchQuery);
    else
      setSearchResults([]);
  }, [searchQuery]);

  return (
    <div className="w-full">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-2 pb-4 lg:pb-0 h-full lg:h-20">
          <div className="relative mt-3 w-full lg:w-[600px] h-[30px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#a2a0a0] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here. . . ."
            />
            {showResults && searchResults?.length > 0 && searchQuery && (
              <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
                {searchResults
                  .filter(product => product.quantity > 0)
                  .map((product) => (
                    <Link to={`/product/${product?._id}`} key={product?._id} onClick={handleLinkClick}>
                      <div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <img src={product?.image?.url} alt={product?.name} className="w-10 h-10 object-cover rounded-md"/>
                          <div className="flex flex-col">
                            <p className="text-base text-primeColor font-semibold">{product?.name}</p>
                            <p className="text-sm text-gray-400">{product?.description}</p>
                          </div>
                        </div>
                        <p className="text-base text-primeColor font-semibold">Rs {product.price}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Search;