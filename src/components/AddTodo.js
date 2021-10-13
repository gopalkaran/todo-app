import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AddCircle } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import styles from '../styles/AddTodo.module.scss';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

function AddTodo({ open, handleOpen, handleClose, fetchItems }) {
  const [todo, setTodo] = React.useState({
    title: "",
    description: "",
  });

  const submitTodo = (e) => {
    e.preventDefault();
    if (todo.title !== "" && todo.description !== "") {
      axios
        .post("http://localhost:8000/todos", todo)
        .then((res) => {
          // console.log(res);
          setTodo({ title: "", description: "" });
          handleClose();
          fetchItems();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <AddCircle
        onClick={handleOpen}
        fontSize="large"
        style={{
          color: "#2563EB",
          position: "fixed",
          right: "5rem",
          bottom: "5rem",
        }}
        className={styles.plusIcon}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitTodo}>
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />

            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            />

            <Button variant="contained" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}

export default AddTodo;
