import React, { useEffect, useState } from 'react';
import Accordion from './Accordion.js'
import Data from '../Lophils.json';
import Pagination from './Pagination';
import Controls from './Controls';
import { MdKeyboardArrowDown } from 'react-icons/md';
import SelectAll from './SelectAll';

function EmailAccordion() {
  const [alldata, setAlldata] = useState([]);
  const [unread, setUnread] = useState([]);
  const [saved, setSaved] = useState([]);
  const [saveindex, setSaveindex] = useState([]);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(49);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedState, setCheckedState] = useState()

  // on Mount
  useEffect(() => {
    setUnread(Data);
    // setAlldata(Data);
  }, []);

  // useEffect(() => {
  //   setAlldata(() => [...unread, ...saved])
  //   const indexAll = async (data) => {
  //     const indexFunction = data.map((current, index) => ({...current, "index": index}))
  //     setAlldata(indexFunction)
  //   };
  //   indexAll(alldata)
  //   console.log(alldata)
  // }, [unread, saved])


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

    // const totalPrice = updatedCheckedState.reduce(
    //   (sum, currentState, index) => {
    //     if (currentState === true) {
    //       return sum + data[index].price;
    //     }
    //     return sum;
    //   },
    //   0
    // );
  };
  
  const handleDelete = () => {
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  
  // currentData = currentPosts
  const renderBody = (currentData) => {
    return(
      currentData.map((currElement, index) => (
        <Accordion {...currElement} 
          key={((currentPage-1) * postsPerPage) + index} 
          keyId={((currentPage-1) * postsPerPage) + index} 
          checkedState={checkedState} 
          handleCheckChange={(e) => handleCheckChange(e, ((currentPage-1) * postsPerPage) + index)} />
      )));
  }

  const renderSaved = (savedData) => {
    console.log(saved)
    return(
      savedData.map((currElement, index) => (
        <Accordion {...currElement} 
          key={(currElement.index)} 
          keyId={(currElement.index)} 
          checkedState={checkedState} 
          handleCheckChange={(e) => handleCheckChange(e, (currElement.index))} 
          />
      )));
  }

  return(
    <div>
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <Controls 
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
      <div className="flex flex-row justify-between items-center my-4">
        <div className="text-gray-400 font-medium ">
          <span>Unread</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-white bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center pl-1 pt-2 pb-1">
            {unread.length}
            <MdKeyboardArrowDown className="text-sm" />
          </div>
        </div>
      </div>
      <div className="accordion__body flex flex-col gap-4 my-4">
        {renderBody(currentPosts)}
      </div>

      {/* Label */}
      <div className="flex flex-row justify-between items-center my-4">
        <div className="text-gray-400 font-medium ">
          <span>Recently Saved</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-white bg-gray-400 rounded-full h-12 w-12 flex justify-center items-center pl-1 pt-2 pb-1">
            {saved.length}
            <MdKeyboardArrowDown className="text-sm" />
          </div>
        </div>
      </div>

      <div className="accordion__body flex flex-col gap-4 my-4">
        {(currentPosts.length < 50) ? renderSaved(saveindex) : null}
      </div>
    </div>
)};

export default EmailAccordion;