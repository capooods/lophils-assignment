import React, { useEffect, useState } from 'react';
import Accordion from './Accordion.js'
import Data from '../Lophils.json';
import Pagination from './Pagination';
import Controls from './Controls';

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(49);

  let data = Data;
  data.sort((a, b) => {
    return b.time_sent.localeCompare(a.time_sent);
  })
  
  useEffect(() => {
    const fetchPosts = async (data) => {
      setPosts(data)
    };

    fetchPosts(data);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  

  const renderBody = (currentData) => {
    return(
    currentData.map((currElement, index) => (
      <Accordion {...currElement} key={currElement.id} />
    )));
  }

  return(
    <div>
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <Controls />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
      </div>
      
      <div className="accordion__body flex flex-col gap-4 my-4">
        {renderBody(currentPosts)}
      </div>
    </div>
)};

export default EmailAccordion;