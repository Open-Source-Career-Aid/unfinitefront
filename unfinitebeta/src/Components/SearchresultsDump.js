// useEffect(() => {

    //   if (searchresults.length !== 0) {
    //     setTwothirdHeight('100%');
    //   } else {
    //     setTwothirdHeight('100vh');
    //   }
    // }, [searchresults]);

// useEffect(() => {

    //   setSearchresults([]);

    //   if (topicid!==null && roadmapid!==null) {

    //     const getSearchresultsData = async () => {
    //       const data = await getSearchresults(roadmapid, topicid);
    //       setSearchresults(data);
    //     };
    //     getSearchresultsData();
    //   }
    // }, [topicid]);

    // useEffect(() => {

    //   if (searchresults.length!==0) {
    //     setLoading(false);
    //   }
    // }, [searchresults]);

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    // const data = getRoadmap(query)
    // console.log(roadmap)
    
    // console.log("roadmap works")
    // returns data in a list of items}

 // useEffect(() => {

    //   if (serpindex!==null && thumbs!==null) {

    //     const queryid = roadmapid;
    //     const topicindex = topicid;
    //     console.log('serpindex:', serpindex, 'thumbs:', thumbs);
    //     const response = sendFeedbackSerp({queryid, topicindex, serpindex, thumbs});
    //     console.log('response:', response);
    //     setSerpindex(null);
    //     setThumbs(null);

    //   }

    // }, [serpindex, thumbs]);


    // const handleLikeDislike = async (event, index) => {
    //   const value = event.target.value;

    //   if (value === 'like') {
    //     setThumbs(1);
    //     setSerpindex(index);
    //     console.log('thumbs:', thumbs);
    //   } else {
    //     setThumbs(0);
    //     setSerpindex(index);
    //     console.log('thumbs:', thumbs);
    //   }

    // };

    // const roadmaprender = roadmap.map((str, index) => (
    
    //   // radio button
    //   <label key={str} className='topics'>
    //      <input type="checkbox" name="topicLabel" value="no" />
    //       <a onClick={(event) => 
    //         {handleTopicClick(index, event);}}>
    //         {str}
    //       </a>
    //    </label>
    // ));

// const searchrender = searchresults.map(([link, title], index) => {
    
    //   return (
    //     <div className="searchcard" key={link}>
    //       <a href={link} target="_blank" rel="noopener noreferrer">
    //         <div className="search-card-content">
    //           <div className="card-body">
    //             <h5 className="card-title">{title}</h5>
    //             <p className="card-text">{link}</p>
    //           </div>
    //           <div className="like-dislike-container">
    //             <label className="like-icon">
    //               <input
    //                 type="radio"
    //                 name={`like-dislike-${index}`}
    //                 value="like"
    //                 onChange={(event) => {
		// 				handleLikeDislike(event, index);
		// 			}}
    //               />
    //               {/* <span className="like-icon"></span> */}
    //             </label>
    //             <label className="dislike-icon">
    //               <input
    //                 type="radio"
    //                 name={`like-dislike-${index}`}
    //                 value="dislike"
    //                 onChange={(event) => {
		// 				handleLikeDislike(event, index);
		// 			}}
    //               />
    //               {/* <span></span> */}
    //             </label>
    //           </div>
    //         </div>
    //       </a>
    //     </div>
    //   );
    // });

    // const searchresultsrender = searchresults.map((str, index) => (
    //   <a key={str}> {str} </a>
    // ));

    {/* <div className='searchresults'>
                    {loading ? <Loading /> : null}
                    {searchrender}
                  </div> */}