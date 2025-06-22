"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTaskRequest } from "@/lib/api"
import type { Task } from "@/pages/index.jsx"
import type React from "react"
import { useState } from "react"

interface CreateTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreateTask: (task: Task) => void
}

export function CreateTaskDialog({open, onOpenChange, onCreateTask}: CreateTaskDialogProps){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        setIsSubmitting(true)
        try {
            const createdTask = await createTaskRequest(title.trim(), description.trim())
            onCreateTask(createdTask)
            setTitle("")
            setDescription("")
            onOpenChange(false)
        } catch (err) {
            console.error("Error creando tarea:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
        setTitle("")
        setDescription("")
        onOpenChange(false)
        }
    }

    return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Crear Nueva Tarea</DialogTitle>
            <DialogDescription>
                Añade una nueva tarea a tu lista. Completa los campos y haz clic en crear.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Ingresa el título de la tarea"
                    disabled={isSubmitting}
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    placeholder="Describe los detalles de la tarea (opcional)"
                    disabled={isSubmitting}
                    rows={3}
                />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancelar
                </Button>
                <Button type="submit" disabled={!title.trim() || isSubmitting}>
                {isSubmitting ? "Creando..." : "Crear Tarea"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}