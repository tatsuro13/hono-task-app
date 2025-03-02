import { useEffect, useState } from 'react'
import './App.css'
import { fetchTasks } from './api'

type Task = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  return (
      <div>
        <h1>タスク一覧</h1>
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
