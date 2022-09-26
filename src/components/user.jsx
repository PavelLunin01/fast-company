import React from "react";
import BookMark from "./bookmark";
import Qualities from "./qualitie";

const User = ({_id, name, profession, qualities, completedMeetings, rate, bookmark, ...rest}) => {
  let handleDelete = rest.onDelete;

  return (
     <>
       <tr key={_id}>
         <th scope="row">{name}</th>
         <td>
           {qualities.map((quality) => <Qualities key={quality._id} {...quality}/>)}
         </td>
         <td>{profession.name}</td>
         <td>{completedMeetings}</td>
         <td>{rate}</td>
         <td>
           <BookMark status={bookmark} onToggleBookMark={rest.onToggleBookMark} id={_id}/>
         </td>
         <td>
           <button className='btn btn-danger' onClick={() => handleDelete(_id)}>delete</button>
         </td>
       </tr>
     </>
    );
}
export default User;
