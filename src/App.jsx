import { useState, useEffect  } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState("") 

  function persistData (newList){
    localStorage.setItem("todos", JSON.stringify({todos : newList})) 
    
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(todoIndex){
    const newTodoList = todos.filter((todo, index) => index !== todoIndex)
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(todoIndex){
    const valueToBeEdited = todos[todoIndex]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(todoIndex)
  }  

  useEffect(() => {
    if(!localStorage) {
      return
    }
    let localTodos = localStorage.getItem("todos")
    if(!localTodos) {
      return
    } 
    localTodos = JSON.parse(localTodos) 
    setTodos(localTodos.todos)
  }, [])


  return (
    <main>
      <TodoInput todoValue={todoValue}
      setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <br />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo}
      handleEditTodo={handleEditTodo} /> 
     </main>
  )
}


export default App
