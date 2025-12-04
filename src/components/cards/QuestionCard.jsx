import React from "react";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  return <>
    <div>{question}</div>
    <div>{answer}</div><br />
  </>
};

export default QuestionCard;
