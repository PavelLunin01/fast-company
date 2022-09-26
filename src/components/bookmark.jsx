import React from "react";

const BookMark = ({status, id, ...rest}) => {

  let handleToggleBookMark = rest.onToggleBookMark;
  return (
    <i className={'bi bi-' + (status ? 'bookmark-fill' : 'bookmark')}
             onClick={() => handleToggleBookMark(id)}>
    </i>
  )
};

export default BookMark;
