import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import{useState, useEffect} from 'react'

function App() {
  const [showAddTask, setShowAddTAsk] = useState(false)
  const[tasks,setTask] = useState([])
  useEffect(()=>{
    const getTask = async ()=>{
      const taskFromServer = await fechTAsk()
      setTask(taskFromServer)
    }
   
    getTask()
  },[])
  // fech data 
  const fechTAsk = async ()=>{
    const  res = await fetch("http://localhost:5000/tasks")
    const data  = await res.json()
    console.log(data)
    return data
  }

  const fechOneTAsk = async (id)=>{
    const  res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data  = await res.json()
    console.log(data)
    return data
  }



// add task
const addTask = async (task)=>{
  // const id = Math.floor(Math.random()*10000)+1
  // const newTask ={id, ...task}
  // setTask([...tasks,newTask])
  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',headers:{'Content-type':'application/json'},body:JSON.stringify(task)
  })
  const data =await res.json()
  setTask([...tasks, data])


}
// delet Task
const deleteTask =async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })

  setTask(tasks.filter((task)=>task.id !== id))
}
// toggle remainter
const toggleRemainte =async(id)=>{
  const taskTOTOggel = await fechOneTAsk(id)
  const updTask = {...taskTOTOggel,reminder:!taskTOTOggel.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  })

  const data = await res.json()
 setTask(tasks.map((task)=> task.id === id ?{...task, reminder:data.reminder}:task))
}
  return (
    <div className="container">
      <Header onAdd={()=> setShowAddTAsk(!showAddTask)} showAddTask={showAddTask}/>
       {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0 ?(
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainte}/>
      ):(
        'NO TAsks to show'
      )
      }
    </div>
  );
}

export default App;
