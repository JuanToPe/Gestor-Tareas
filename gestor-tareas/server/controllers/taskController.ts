import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data', 'tasks.json')

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    createdAt: string;
    updateAt: string;
}

function readTasks(){
    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]')
        const rawData = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(rawData)
}

function writeTasks(tasks: any[]){
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2))
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer las tareas' });
    }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try{
        const { title, description, status } = req.body;

        if (!title || !description){
            res.status(400).json({error: 'FALTAN CAMPOS OBLIGATORIOS'});
            return;
        }

        const tasks = readTasks();
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            status: status || 'pending',
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString()
        };
        tasks.push(newTask);
        writeTasks(tasks);
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
}

export const updateTask = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { title, description, status } = req.body;

    try{
        const tasks = readTasks();
        const taskIndex = tasks.findIndex((t: Task) => t.id === id);

        if (taskIndex === -1){
            console.log("Tarea no encontrada con ID:", id);
            res.status(404).json({ error: 'Tarea no encontrada' });
            return
        }

        const updatedTask = {
            ...tasks[taskIndex],
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && { status }),
            updateAt: new Date().toISOString(),
        };

        tasks[taskIndex] = updatedTask;
        writeTasks(tasks);
        res.json(updatedTask);
    }catch (error){
        console.error("Error en el backend:", error);
        
        let errorMessage = 'Error al actualizar la tarea';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        res.status(500).json({ 
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? 
                (error instanceof Error ? error.stack : undefined) 
                : undefined
        });
    }
}

export const deleteTaks = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    let tasks = readTasks();
    const taskIndex = tasks.findIndex((t: Task) => t.id === id)

    if (taskIndex === -1){
        res.status(404).json({ error: "Tarea no encontrada" });
        return
    }

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);

    res.status(200).json({ message: "Tarea eliminada correctamente", id });
}