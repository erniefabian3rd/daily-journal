import React from "react";

export const Entry = ({ entry, mood, onEditButtonClick, onDeleteButtonClick }) => {
  const getMessageType = () => {
    if (mood) {
      switch (mood.label) {
        case 'Angry':
          return 'is-danger'
        case 'Happy':
          return 'is-success'
        case 'Ok':
          return 'is-warning'
        case 'Sad':
          return 'is-primary'
        default:
          break;
      }
    }
  }

  return (
    <article className={`message ${getMessageType()}`} style={{width:"100%"}}>
      <div className="message-body">
        <p className="entry__concept">{entry.concept}</p>
        <p className="entry__entry">{entry.entry}</p>
        <p className="entry__date">{entry.date}</p>
        <section id={`mood--${mood?.id}`}>
            <div>My mood was {mood?.label} when I learned this</div>
        </section>
        <section className="entry_tag_container">
        {entry.tags.map(tag => 
          <p className="entry__tag" id={`tag--${tag?.id}`}>{tag?.name}</p>
          )}
          </section>
        <div className="buttons">
          <button className={`button ${getMessageType()} is-outlined`} onClick={
            () => {
              onEditButtonClick(entry.id)
            }
          }>Edit</button>
          <button className={`button ${getMessageType()}`} onClick={
            () => {
              onDeleteButtonClick(entry.id)
            }
          }>Delete</button>
        </div>
      </div>
    </article>
  )
};