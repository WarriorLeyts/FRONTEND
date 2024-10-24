import React from 'react'
import "@/styles/Topics.css";
import formatNumber from '@/formatNumber';
import declineMessage from '@/declineMessage';

export default function TopicItem({ topic }) {
  return (
    <li className="hashtags-item">
      <p className="hashtag">{topic.hashName}</p>
      <span className="hashtag-sub">{`${formatNumber(topic.countMessages)}  ${declineMessage(topic.countMessages)}`}</span>
    </li>
  )
}
