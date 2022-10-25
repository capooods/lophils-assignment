import React, { useEffect, useState } from 'react';
import Accordion from './Accordion.js'
import Data from '../Lophils.json';
import Pagination from './Pagination';
import Controls from './Controls';
import { MdKeyboardArrowDown } from 'react-icons/md';

function EmailAccordion() {
  const [alldata, setAlldata] = useState([]);
  const [unread, setUnread] = useState([]);
  const [saved, setSaved] = useState([]);
  const [saveindex, setSaveindex] = useState([]);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedState, setCheckedState] = useState()

  // on Mount
  useEffect(() => {
    setUnread(Data);
  }, []);

  // on Data change
  useEffect(() => {
    unread.sort((a, b) => {
      return b.time_sent.localeCompare(a.time_sent);
    })

    const fetchPosts = async (data) => {
      const indexFunction = data.map((current, index) => ({...current, "index": index}))
      setPosts(indexFunction)
    };
    fetchPosts(unread);

    const resetCheckedState = (() => {
      setCheckedState([]);
      for (let i = 0; i < (unread.length + saved.length); i++) {
        setCheckedState((prev) => [...prev, {"index": i, "checked": false}])
      }
    })
    resetCheckedState();
    setSelectAll(false)

  }, [unread]);

  useEffect(() => {
    setAlldata(() => [...posts, ...saved])
  }, [posts]);


  useEffect(() => {
    saved.sort((a, b) => {
      return b.time_sent.localeCompare(a.time_sent);
    })

    const indexSave = async (data) => {
      const indexFunction = data.map((current, index) => ({...current, "index": (unread.length + index)}))
      setSaveindex(indexFunction)
    };
    indexSave(saved);

    const resetCheckedState = (() => {
      setCheckedState([]);
      for (let i = 0; i < (unread.length + saved.length); i++) {
        setCheckedState((prev) => [...prev, {"index": i, "checked": false}])
      }
    })
    setSelectAll(false)
    resetCheckedState();
  }, [saved])

  
  const handleCheckAll = (e) => {
    setSelectAll(!selectAll);
    let updatedCheckedState;
    if (selectAll === true) {
      updatedCheckedState = checkedState.map((item, index) =>
      (index >= 0) ? {"index": index, "checked": false} : item
    )} else {
      updatedCheckedState = checkedState.map((item, index) =>
      (index >= 0) ? {"index": index, "checked": true} : item )
    }
    setCheckedState(updatedCheckedState)
  }

  const handleCheckChange = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? {"index": index, "checked": !item.checked} : item
    );
    setCheckedState(updatedCheckedState);
  };
  
  const handleDelete = () => {
    setSelectAll(false);
    let copyPosts = posts;
    let copyCheck = checkedState;
    let copySave = saveindex;
    
    copyCheck = copyCheck.filter(copyCheck => copyCheck.checked === false)
    const result = copyPosts.filter(copyPosts => copyCheck.some(copyCheck => copyCheck.index === copyPosts.index))
    setUnread(result);
    const saveresult = copySave.filter(copySave => copyCheck.some(copyCheck => copyCheck.index === copySave.index))
    setSaved(saveresult);
  }

  const handleSave = () => {
    setSelectAll(false);
    let copyPosts = posts;
    let copyTrueCheck = checkedState;
    let copyFalseCheck = checkedState;
    copyTrueCheck = copyTrueCheck.filter(copyTrueCheck => copyTrueCheck.checked === true)
    copyFalseCheck = copyFalseCheck.filter(copyFalseCheck => copyFalseCheck.checked === false)
    const saveData = copyPosts.filter(copyPosts => copyTrueCheck.some(copyTrueCheck => copyTrueCheck.index === copyPosts.index))
    const deleteData = copyPosts.filter(copyPosts => copyFalseCheck.some(copyFalseCheck => copyFalseCheck.index === copyPosts.index))
    setSaved(prev => [...saveData, ...prev])
    setUnread(deleteData);
  }
  // Pagination 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const saveindexOfLastPost = (currentPage * postsPerPage) - unread.length;
  let saveindexOfFirstPost = saveindexOfLastPost - postsPerPage;
  
  const currentSave = saveindex.slice(((saveindexOfFirstPost < 0) ? 0 : saveindexOfFirstPost), saveindexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  
  // currentData = currentPosts
  const renderBody = (currentData, type) => {
    return (
    <>
      {/* Label */}
      <div className="flex flex-row justify-between items-center my-4">
          <div className="text-gray-400 font-medium ">
            <span>{type}</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-white bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center pl-1 pt-2 pb-1">
              {type === "Unread" ? unread.length : saved.length}
              <MdKeyboardArrowDown className="text-sm" />
            </div>
          </div>
      </div>
      {/* Accordion generator */}
      <div className="accordion__body flex flex-col gap-4 my-4">
        {currentData.map((currElement, index) => (
          <Accordion {...currElement} 
            key={currElement.index} 
            keyId={currElement.index} 
            checkedState={checkedState} 
            handleCheckChange={(e) => handleCheckChange(e, (currElement.index))}
            type={type} />
        ))}
        
      </div>
      
    </>
    )
  }

  return(
    <div>
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <Controls 
          selectAll={selectAll}
          handleCheckAll={handleCheckAll}
          handleDelete={handleDelete}
          handleSave={handleSave} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={alldata.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage}
        />
      </div>
      <div className="my-4">
        <hr />
      </div>
      {/* Unread */}
      {(currentPosts.length !== 0) ? renderBody(currentPosts, "Unread") : null}

      {/* Recently Saved */}

      {(currentPosts.length < postsPerPage) ? renderBody(currentSave, "Recently Saved") : null}

    </div>
)};

export default EmailAccordion;