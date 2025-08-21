import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

import './App.css'

function App() {

  const [todo, setTodo] = useState([])
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, [])



  const saveToLS = (todosToSave) => {
  localStorage.setItem('todos', JSON.stringify(todosToSave));
};

  const toggleFiniesd = (e) => {
    setshowFinished(!showFinished);
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS(newTodos);
    console.log('Edit button clicked');
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS(newTodos);
    console.log('Delete button clicked');
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS(newTodos);
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  // console.log(todos);

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);

  }




  return (
    <>
      <Navbar />
      <div className="md:container mx-3  bg-violet-100 my-5 p-5 md:mx-auto rounded-lg shadow-md min-h-[80vh] md:w-[35%]">
        <h1 className='text-center font-bold text-3xl'>iTask -Todos Manager</h1>
        <div className="addtodo my-5 flex flex-col  gap-3">
          <h2 className='text-2xl font-bold  '>Add a Todo</h2>
          <div className='flex w-full'>
            <input onChange={handleChange} autoFocus placeholder='Enter You task here...' value={todo} type="text" className='w-full p-1 rounded-full outline-none border border-violet-400 hover:border-violet-900 ' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 disabled:bg-violet-700 hover:bg-violet-950 text-white rounded-md font-bold p-2 py-1 mx-1 '>Save</button>
          </div>
        </div>
        <input onChange={toggleFiniesd} id='show' type="checkbox" checked={showFinished} className='mb-3 ' />
        <label htmlFor="show" className='mx-2'>Show Finished Todos</label>
        <div className="h-[1px] bg-violet-600 opacity-95 my-3 w-[90%] mx-auto"></div>
        <h2 className='text-xl font-bold'>Your Todo</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='bg-violet-200 p-2 mt-2 py-4 rounded-md text-lg font-bold'>No Todos Added</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo rounded-md bg-violet-200 p-1 py-2 flex  my- justify-between my-1">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 text-white rounded-md font-bold mx-2 p-2 py-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-950 text-white rounded-md font-bold mx-2 p-2 py-1'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
