import { useEffect, useState } from 'react'
import './App.css'
import { addTask, fetchTasks } from './api'

type Task = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    
   
    const newTask = await addTask(newTaskTitle);
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    
  }

  return (
      <div>
        <h1>タスク</h1>
        <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder='タスクを入力' />
        <button onClick={handleAddTask}>追加</button>
        <h2>タスク一覧</h2>
        <ul>
         {tasks.map((task:Task) => (
            <li key={task.id}>
              {task.title} : {task.completed ? '完了' : '未完了'}
            </li>
          ))}
        </ul>
      </div>
  )
}

export default App
