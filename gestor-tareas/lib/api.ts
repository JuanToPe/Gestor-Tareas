const BASE_URL = 'http://localhost:3001/api/tasks/';

export interface Task{
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    createdAt: string;
    updateAt: string;
}

export async function getTasks(): Promise<Task[]>{
    const res = await fetch(`${BASE_URL}tasksList`, {cache: 'no-store'});
    if (!res.ok) throw new Error ('Error al botener tareas');
    return res.json();
}

export async function createTaskRequest(title: string, description: string): Promise<Task> {
    
    const newTask = {
        title,
        description,
        status: "pending",
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
    }

    const res = await fetch(`${BASE_URL}createTask`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al crear la tarea");
    }

    return res.json()
}

export async function updateTaskRequest( id: string, updates: { title?: string; description?: string; status?: "pending" | "completed" }) : Promise<Task> {
    const res = await fetch(`${BASE_URL}${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates)
    });

    if (!res.ok){
        const errorData = await res.json().catch(() => ({}));
        console.log('Error detallado:',{
            status: res.status,
            errorData
        });
        throw new Error(errorData.error || "Error al actualizar la tarea");
    }
    return res.json();
}

export async function deleteTaskRequest (id: string): Promise<{message: string; id: string}> {
    const res = await fetch(`${BASE_URL}delete/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al eliminar la tarea");
    }

    return res.json();
}