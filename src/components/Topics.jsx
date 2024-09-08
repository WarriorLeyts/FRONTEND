import '@/styles/Topics.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopics } from '../store/topicsSlice';

const Topics = () => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topics.topics);
  const loading = useSelector((state) => state.topics.loading);
  const error = useSelector((state) => state.topics.error);

    useEffect(() => {
      dispatch(fetchTopics())
    }, [dispatch]);
   
   const getTopics = () => {
    if (loading || error) {
      return topics.map((item) => {
        return (
          <li className="hashtags-item" id={`hash-li_${item}`}>
          <div className="no-hash"></div>
          <div className="no-hash2"></div>
        </li>
       )
      })
    }
    return (
      topics.map((item, index) => {
        return (
          <li className="hashtags-item" id={`hash-li_${index}`}>
         <p className="hashtag">{item.hashName}</p>
         <span className="hashtag-sub">{item.numOfMessage}</span>
        </li>
       )
      })
    )
   }
  
    return (
    <>
    <div className="topics">
     <h4 className="topics__title">Актуальные темы</h4>
       <ul className="hashtags-items">
        {getTopics()}
      </ul>
    </div>
    </>
    )
}
export default Topics;