import '@/styles/Topics.css';
import useFetchStore from '@/store/fetch.js';
import { useEffect } from "react";

const Topics = () => {
    const topics = [1, 2, 3, 4];
    const resTopics = useFetchStore ((state) => state.topics);
    const setTopics = useFetchStore ((state) => state.setTopics);
    useEffect(() => {
      setTopics();
    }, []);
    let body = <div className="topics">
    <h4 className="topics__title">Актуальные темы</h4>
    <ul className="hashtags-items">
        {topics.map((item) => {
          return (
            <li className="hashtags-item" id={`hash-li_${item}`}>
            <div className="no-hash"></div>
            <div className="no-hash2"></div>
          </li>
         )
        })}
    </ul>
    </div>
    const body2 = <div className="topics">
    <h4 className="topics__title">Актуальные темы</h4>
    <ul className="hashtags-items">
        {resTopics.map((item, index) => {
          return (
            <li className="hashtags-item" id={`hash-li_${index}`}>
           <p className="hashtag">{item.hashName}</p>
           <span className="hashtag-sub">{item.numOfMessage}</span>
          </li>
         )
        })}
    </ul>
    </div>
    body = Object.keys(resTopics).length ? body2 : body;
    return (
    <>
    {body}
    </>
    )
}
export default Topics;