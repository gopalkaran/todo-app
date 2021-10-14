import React, {useEffect, useState} from 'react';
import './App.css';
import {Typography, AppBar, CssBaseline, Toolbar, Container} from '@mui/material'; 
import { FormatListBulletedRounded} from '@mui/icons-material';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const fetchItems = async () => {
    const data = await fetch('http://localhost:8000/todos');
    // console.log(data);
    const items = await data.json();
    // console.log(items);
    setTodos(items);
  }

  useEffect(() => {
    fetchItems();
  }, [])




  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between', height:'5rem'}}>
          <FormatListBulletedRounded fontSize='large' />
          <Typography variant='h4'>Todo App</Typography>
          <Typography variant='h4'></Typography>
        </Toolbar>
      </AppBar>
      <main>
        
        <div>
          <Container maxWidth='md'>
            <ul className='todo-list'>
              {
                 todos.map((todo) => {
                   return <Todo key={todo.id} title={todo.title} description={todo.description} index={todo.id} fetchItems={fetchItems} />
                 })
              }
            </ul>
          </Container>
        </div>
        
        <AddTodo open={open} handleOpen={handleOpen} handleClose={handleClose} fetchItems={fetchItems} />
 
      </main>
    </>
  );
}

export default App;
