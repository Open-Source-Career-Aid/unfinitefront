import Reach from 'react';
import { useState, useEffect } from 'react';
import getRoadmap from '../Functions/getRoadmap';
import getTopicCompletion from '../Functions/getTopicCompletion';
import trackCompletion from '../Functions/trackCompletion';
import updateTopicCompletion from '../Functions/updateTopicCompletion';

const RoadmapContainer = (props) => {

    const { query , setQuery , roadmapid , setRoadmapid , roadmap , setRoadmap , topicid , setTopicid , completion ,
    setCompletion , tracking , setTracking} = props;

    useEffect(() => {

        const getRoadmapData = async () => {
          const data = await getRoadmap(query);
          const completionresponse = await getTopicCompletion({queryid: data[0]});
          setRoadmapid(data[0]);
          setRoadmap(data[1]);
          setTopicid(null);
          setCompletion(JSON.parse(completionresponse[1]));
          setTracking(JSON.parse(completionresponse[0]));
          // console.log('completion:', completionresponse);
        };
        getRoadmapData();
      }, [query]);

      const handleTopicClick = (index, event) => {
        event.preventDefault();
        setTopicid(null)
        setTopicid(index);
        console.log('topic', index, "roadmap", roadmapid);
      };

      const handleTrackingbutton = async () => {
        const response = await trackCompletion(roadmapid);
        console.log('response:', response);
  
        if (response.status === 200) {
          setTracking(true);
        }
      }

      const roadmaprender = roadmap.map((str, index) => {
        // get completion status for this checkbox
       console.log('completion:::', completion);
       const isCompleted = completion[index] === 1 ? true : false;
       console.log('isCompleted:::', isCompleted, completion[index]);
 
       const handleCheckboxChange = (event) => {
         // get the current state of the checkbox
         const isChecked = event.target.checked;
         
         // call a function to update the completion status
         console.log('checkbox', index, 'is', roadmapid);
         updateTopicCompletion(roadmapid, index);
       };
     
       return (
         <label key={str} className='topics'>
           <input type="checkbox" name="topicLabel" defaultChecked={isCompleted} onChange={handleCheckboxChange}/>
           <a onClick={(event) => {handleTopicClick(index, event);}}>
             {str}
           </a>
         </label>
       );
     });

        return (
            <>
                <div className='trackprogress'>
                    <h1 className='queryDisplay'>{query}</h1>
                    {!tracking ? 
                    <button className='trackprogressbutton' onClick={handleTrackingbutton}>Track progress</button> :
                    <p>tracking...</p>
                    }
                    
                  </div>

                  <div class='topicscard'>
                    {roadmaprender}
                  </div>
            </>
        )
}

export default RoadmapContainer;


