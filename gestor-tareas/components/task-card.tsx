import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Task } from "@/pages/index.jsx";
import { Check, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
    task: Task
    onToggleStatus: () => void
    onEdit: () => void
    onDelete: () => void
}

export function TaskCard({ task, onToggleStatus, onEdit, onDelete }: TaskCardProps){
    const [showDeletedDialog, setShowDeletedDialog] = useState(false)

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    return (
        <>
            <Card className={`transition-all duration-200 hover:shadow-md ${task.status === "completed" ? "bg-green-50 border-green-200" : "bg-white"}`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start space-x-3 flex-1">
                        <Button variant="ghost" size="sm" onClick={onToggleStatus} className={`mt-1 h-6 w-6 p-0 rounded-full border-2 ${task.status === "completed"? "bg-green-500 border-green-500 text-white hover:bg-green-600": "border-gray-300 hover:border-green-500"}`}>
                            {task.status === "completed" && <Check className="h-3 w-3" />}
                        </Button>
                        <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-lg ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"}`}>{task.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={task.status === "completed" ? "secondary" : "default"}>
                                    {task.status === "completed" ? (
                                        <>
                                            <Check className="h-3 w-3 mr-1" />
                                            Completada
                                        </>
                                    ) : (
                                        <>
                                            <Clock className="h-3 w-3 mr-1" />
                                            Pendiente
                                        </>
                                    )}
                                </Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onToggleStatus}>
                                    <Check className="h-4 w-4 mr-2" />
                                    {task.status === "completed" ? "Marcar pendiente" : "Marcar completada"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onEdit}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowDeletedDialog(true)} className="text-red-600 focus:text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                {task.description && (
                    <CardContent className="pt-0">
                        <p className={`text-sm ${task.status === "completed" ? "text-gray-500" : "text-gray-700"}`}>
                        {task.description}
                        </p>
                        <div className="mt-3 text-xs text-gray-400">
                        <div>Creada:{formatDate(new Date(task.createdAt))}</div>
                        {task.updateAt !== task.createdAt && (<div>Actualizada: {formatDate(new Date(task.updateAt))}</div>)}
                        </div>
                    </CardContent>
                    )}
            </Card>

            <AlertDialog open={showDeletedDialog} onOpenChange={setShowDeletedDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
                        <AlertDialogDescription>
                        Esta acción no se puede deshacer. La tarea "{task.title}" será eliminada permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                        onClick={() => {
                            onDelete()
                            setShowDeletedDialog(false)
                        }}
                        className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}