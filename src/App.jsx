import { useState, useEffect } from 'react'
import ListItem from './components/ListItem'
import './App.css'


const getList = () => {
  const localList = JSON.parse(localStorage.getItem('list'));
  if (localList) return localList
  return [];
}


function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState(getList());


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

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