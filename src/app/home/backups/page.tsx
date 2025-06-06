"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Database,
  Upload,
  RotateCcw,
  Search,
  Calendar,
  HardDrive,
  FileX,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { backupService } from "@/services/backups.service";
import type { IBackup } from "@/types/backup-interface";

// Simple toast notification component
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border ${
        type === "success"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <XCircle className="h-5 w-5" />
      )}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
}

export default function Backups() {
  const [backups, setBackups] = useState<IBackup[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [restoreDialog, setRestoreDialog] = useState<{
    open: boolean;
    backup: IBackup | null;
  }>({ open: false, backup: null });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const filteredBackups = useMemo(() => {
    return backups.filter((backup) =>
      backup.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [backups, searchTerm]);

  const fetchBackups = async () => {
    try {
      setIsLoading(true);
      const data = await backupService.listBackups();
      setBackups(data);
    } catch (error) {
      showToast("No se pudieron cargar los backups", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    try {
      setIsLoading(true);
      await backupService.createBackup();
      showToast("El backup se ha creado exitosamente", "success");
      fetchBackups();
    } catch (error) {
      showToast("No se pudo crear el backup", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (backup: IBackup) => {
    try {
      setIsLoading(true);
      await backupService.restoreBackup(backup.fileName);
      showToast(
        `El backup "${backup.fileName}" se ha restaurado exitosamente`,
        "success"
      );
      setRestoreDialog({ open: false, backup: null });
    } catch (error) {
      showToast("No se pudo restaurar el backup", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!file) {
      showToast("Selecciona un archivo para importar", "error");
      return;
    }

    try {
      setIsLoading(true);
      await backupService.importBackup(file);
      showToast("El backup se ha importado exitosamente", "success");
      setShowImportDialog(false);
      setFile(null);
      fetchBackups();
    } catch (error) {
      showToast("No se pudo importar el backup", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Gestión de Backups</h1>
        </div>
        <p className="text-muted-foreground">
          Crea, restaura e importa backups de tu aplicación de forma segura
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3 ">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5" />
              Crear Backup
            </CardTitle>
            <CardDescription>
              Genera un nuevo backup de los datos actuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleBackup}
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              <Database className="h-4 w-4 mr-2" />
              {isLoading ? "Creando..." : "Crear Backup"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5" />
              Importar Backup
            </CardTitle>
            <CardDescription>
              Importa un backup desde un archivo local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowImportDialog(true)}
              variant="outline"
              className="w-full cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importar Archivo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar backups por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Backups List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Backups Existentes
              </CardTitle>
              <CardDescription>
                {filteredBackups.length} backup
                {filteredBackups.length !== 1 ? "s" : ""} encontrado
                {filteredBackups.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Badge variant="secondary">{backups.length} total</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredBackups.length === 0 ? (
            <div className="text-center py-12">
              <FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {backups.length === 0
                  ? "No hay backups disponibles"
                  : "No se encontraron backups"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {backups.length === 0
                  ? "Crea tu primer backup para comenzar a proteger tus datos"
                  : "Intenta con un término de búsqueda diferente"}
              </p>
              {backups.length === 0 && (
                <Button
                  onClick={handleBackup}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primer Backup
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBackups.map((backup, index) => (
                <div key={`${backup.fileName}-${index}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Database className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">{backup.fileName}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(backup.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <HardDrive className="h-4 w-4" />
                          {formatFileSize(backup.size)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setRestoreDialog({ open: true, backup })}
                      disabled={isLoading}
                      className="cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restaurar
                    </Button>
                  </div>
                  {index < filteredBackups.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 ">
              <Upload className="h-5 w-5" />
              Importar Backup
            </DialogTitle>
            <DialogDescription>
              Selecciona un archivo de backup para importar a tu aplicación
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="backup-file">Archivo de Backup</Label>
              <Input
                id="backup-file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-1"
              />
            </div>
            {file && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(file.size)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImportDialog(false)}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || isLoading}
              className="cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? "Importando..." : "Importar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog
        open={restoreDialog.open}
        onOpenChange={(open) => setRestoreDialog({ open, backup: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirmar Restauración
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas restaurar el backup{" "}
              <span className="font-semibold">
                "{restoreDialog.backup?.fileName}"
              </span>
              ?
              <br />
              <br />
              Esta acción reemplazará todos los datos actuales y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                restoreDialog.backup && handleRestore(restoreDialog.backup)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
