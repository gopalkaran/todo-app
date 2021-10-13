import React, { useState } from "react";
import { KeyboardArrowDown, Delete } from "@mui/icons-material";
import axios from 'axios';
import styles from '../styles/Todo.module.scss';

const listStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const arrowStyle = {
  cursor: "pointer",
};

const titleStyle = {
  textDecoration: "line-through",
};
const Todo = ({index, title, description , fetchItems}) => {
  const [visibility, setVisibility] = useState(false);
  const [decoration, setDecoration] = useState(false);

  const toggleVisibility = () => {
    setVisibility((visibility) => !visibility);
  };

  const changeDecoration = () => {
      setDecoration(decoration => !decoration);
  };

  const deleteTodo = () => {
    axios
    .delete(`http://localhost:8000/todos/${index}`)
    .then(res => {
      // console.log(res);
      fetchItems();
    })
    .catch(error => console.log(error));
  }

  return (
    <li>
      <div style={listStyle} className={styles.listItemStyle}>
        <div onClick={changeDecoration} style={decoration ? titleStyle : null} className={styles.todoContent}>
          {title}
        </div>
        <div className={styles.downArrow}>
           <KeyboardArrowDown onClick={toggleVisibility} style={arrowStyle} className={styles.downArrowIcon}  />
        </div>
        
        <div className={styles.delete}>
           <Delete onClick={deleteTodo} className={styles.deleteIcon}  />
        </div>
        
      </div>

      {visibility && <div className={styles.todoDescription}>{description}</div>}
    </li>
  );
};

export default Todo;
