import React, { useState } from "react";
import Flex from "../components/Layouts/Flex";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-2 pb-4 lg:pb-0 h-full lg:h-20">
          <div className="relative mt-3 w-full lg:w-[600px] h-[30px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here. . . ."
            />
            <IoSearchOutline className="w-5 h-5 cursor-pointer"/>
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >

              </div>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Search;