"use client"

import type React from "react"

import type { Task } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateTaskRequest } from "@/lib/api.js"
import { useState } from "react"

interface EditTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: Task
    onUpdateTask: (updatedTask: Task) => void
}

export function EditTaskDialog({ open, onOpenChange, task, onUpdateTask }: EditTaskDialogProps) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return
        setIsSubmitting(true);
        try {
            const updatedTask = await updateTaskRequest(task.id, {
                title: title.trim(),
                description: description.trim()
            });
            onUpdateTask(updatedTask);
            onOpenChange(false);
        } catch (err) {
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            setTitle(task.title);
            setDescription(task.description);
            onOpenChange(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
            <DialogDescription>
                Modifica los detalles de tu tarea. Los cambios se guardarán automáticamente.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="edit-title">Título *</Label>
                <Input
                    id="edit-title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Ingresa el título de la tarea"
                    disabled={isSubmitting}
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                    id="edit-description"
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
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}