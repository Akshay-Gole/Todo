import { useState, useEffect } from 'react'
import ListItem from './components/ListItem'
import './App.css'

// used localStorage so we can have our todo's even if we refresh the page
const getList = () => {
  const localList = JSON.parse(localStorage.getItem('list'));
  if (localList) return localList
  return [];
}


function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState(getList());

  // for localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  // accessing the input element for the values we enter
  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  // func to control add functionality
  function handleAdd() {
    if (input === "") {
      alert("You must write something!")
      return
    }
    const newList = list;
    newList.push({ id: new Date().getTime().toString(), title: input, todo: true })
    setList([...newList]);
    setInput('');
  }

  // used to show that we have completed an specific task
  function setTodo(id) {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, todo: !item.todo };
        }
        return item;
      })
    )
  }

  // to delete the items from todo list
  function onDelete(id) {
    const newList = list.filter(curr => !(curr.id === id));
    setList([...newList]);
  }

  return (
    <div className='container'>
      <div className="todo-section">
        <h1>My To Do List</h1>
        <div className='add-to-do'>
          <input type="text" placeholder='Title....' value={input} onChange={(e) => onInputChange(e)} />
          <div onClick={handleAdd} className='btn'>Add</div>
        </div>
      </div>

      <div className="list-items">
        {list.map(item =>
          <div key={item.id} className="list-dec">
            <ListItem item={item} setTodo={setTodo} onDelete={onDelete} />
          </div>
        )}
      </div>

    </div>
  )
}

export default App;