
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { EditTaskDialog } from "@/components/edit-task-dialog";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { deleteTaskRequest, getTasks, updateTaskRequest } from "@/lib/api.js";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export interface Task{
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
  updateAt: string
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all")
  const [isCreatedDialogOpen, setIsCreatedDialogOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const total = tasks.length;
  const pending = tasks.filter(task => task.status === "pending").length;
  const completed = tasks.filter(task => task.status === "completed").length;

  const taskStats = [
    {
      value: total.toString(),
      label: "Total de tareas",
      color: "--titles-primary"
    },
    {
      value: pending.toString(),
      label: "Pendientes",
      color: "--text-primary"
    },
    {
      value: completed.toString(),
      label: "Terminadas",
      color: "--titles-primary"
    }
  ]

  /* Load tasks from localStogare*/
  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, [])
  
  
  /* Filter tasks based on search term and status */
  useEffect(() => {
    let filtered = tasks

    if (searchTerm){
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      )
    }
    if (statusFilter !== "all"){
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    setFilteredTasks(filtered)
  }, [tasks, searchTerm, statusFilter])

  const toggleTaskStatus = async (id: string, currentStatus: "pending" | "completed") => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try{
      const updatedTask = await updateTaskRequest(id, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                status: updatedTask.status,
                updatedAt: updatedTask.updateAt,
              }
            : task,
        ),
      )
    }catch (error) {
      console.error("Error actualizando estado de la tarea:", error);
    }
  }

  const createTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  }

  const handleDelete = async (id: string) =>{
    try{
      const deleteTask = await deleteTaskRequest(id);
      setTasks((prev) => prev.filter((task) => task.id !== id ));
    }catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  }
  



  return (
    /* Title */
    <div className="min-h-screen bg-[var(--bg)] max-w-4xl mx-auto p-4">
      <div className="">
        <h1 className="text-6xl font-bold text-center pb-2 text-[var(--titles-primary)]">Gestor de Tareas</h1>
        <p className="text-[var(--sub-secondary)] text-2xl text-center">Orden y productividad</p>
      </div>

      {/* Stadistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {taskStats.map((stat, index) =>(
          <div key={index} className="bg-[var(--bg-section)] p-4 rounded-lg shadow-sm border border-[var(--own-border)] mt-4">
            <div className={`text-2xl font-bold text-[var(--accent)] text-[var(${stat.color})]`}>{stat.value}</div>
            <p className="text-sm text-[var(--text-primary)]">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 border border-[var(--own-border)] rounded-lg mt-4 p-2 items-center justify-between">
        {/* Search */}
        <div className="rounded-lg shadow-sm w-full">
          <div>
            <div className="relative flex items-center justify-between">
              <Search className="absolute ml-2 transform-translate-y-1/2 text-[var(--titles-primary)] h-4 w-4"/>
              <Input className="pl-10" placeholder="Buscar tareas..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchTerm(e.target.value)}/>
            </div>
          </div>
        </div>

        {/* Filter */}
        <Select value={statusFilter} onValueChange={(value: "all" | "pending" | "completed") => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-48 outline p-2">
            <Filter className="h-4 w-4" />
            <SelectValue/>
            <SelectContent>
              <SelectItem value="all">Todas las tareas</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Button onClick={()=> setIsCreateDialogOpen(true)} className="w-full sm:w-auto z-10 cursor-pointer">
          <Plus className="h-4 w-4"/>
          Nueva Tarea
        </Button>
      </div>

      {/* Task list */}
      <div className="space-y-4 mt-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white mt-4 p-8 rounded-lg shadow-sm border border-[var(--own-border)] text-center">
            {tasks.length === 0 ? (
              <>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-2">No hay tareas</h3>
                <p className="text-gray-600">Crear tarea para comenzar</p>
              </>
            ):(
              <>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No se encontraron tareas</h3>
                <p className="text-[var(--text-secondary)]">Revisar filtros de busqueda</p>
              </>
            )}
          </div>
        ) : (
          filteredTasks.map((task) =>(
            <TaskCard key={task.id} task={task} onToggleStatus={() => toggleTaskStatus(task.id, task.status)} onEdit={() => setEditingTask(task)} onDelete={() => handleDelete(task.id)}/>
          ))
        )}
      </div>

      {/* Dialogs */}
      <CreateTaskDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onCreateTask={createTask} />

        {editingTask && (
          <EditTaskDialog
            open={!!editingTask}
            onOpenChange={(open: boolean) => !open && setEditingTask(null)}
            task={editingTask}
            onUpdateTask={(updateTask: Task) => {
              setTasks(tasks.map(t => t.id === updateTask.id ? updateTask : t));
              setEditingTask(null)
            }}
          />
        )}
    </div>
  );
}
