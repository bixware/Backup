import { useState } from "react";

 

/**
*
* @param Data which data needed to be paginated
* @param ItemsPerPage - No of items per page
* @returns paginated Data, page Count, Current Page, change page function
*
* @description implemented for small, limited data
*/

 

const usePagination = (data, itemsPerPage) => {
  // Default state for pagination
  const [currentPage, setCurrentPage] = useState(1);

 

  // getting Current index
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const count = Math.ceil(data?.length / itemsPerPage);

 

  // Returning All the Data
  return {
    paginate,
    count,
    currentItems,
    currentPage,
  };
};

 

export default usePagination;