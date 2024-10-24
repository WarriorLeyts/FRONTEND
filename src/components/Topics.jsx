import "@/styles/Topics.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopics } from "../store/topicsSlice";
import TopicItem from "./TopicItem";
import { Link } from "react-router-dom";

const Topics = () => {
  const dispatch = useDispatch();
  const { topics, loading, error} = useSelector((state) => state.topics);
 
  useEffect(() => {
    if (!topics.length) {
      dispatch(fetchTopics());
    }
  }, []);
  
  const getTopics = () => {
    if (loading || error) {
      return [1, 2, 3, 4].map((item, index) => {
        return (
          <li className="hashtags-item" key={`topic_${index}`}>
            <div className="no-hash"></div>
            <div className="no-hash2"></div>
          </li>
        );
      });
    }
    return topics?.map((topic, index) => {
      return <Link to={`/search?tag=${topic.hashName.slice(1)}`}><TopicItem key={index} topic={topic} /></Link>
    });
  };

  return (
    <>
      <div className="topics">
        <h4 className="topics__title">Актуальные темы</h4>
        <ul className="hashtags-items">{getTopics()}</ul>
      </div>
    </>
  );
};
export default Topics;
