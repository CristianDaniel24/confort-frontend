"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

export const ConfirmOrderDialog = ({
  open,
  onClose,
  onConfirm,
}: ConfirmOrderDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleConfirm = () => {
    if (!paymentMethod) return;
    onConfirm(paymentMethod);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona el método de pago</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={(value) => setPaymentMethod(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Método de pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EFECTIVO" className="cursor-pointer">
                Efectivo
              </SelectItem>
              <SelectItem value="TARJETA_CREDITO" className="cursor-pointer">
                Tarjeta Credito
              </SelectItem>
              <SelectItem value="TARJETA_DEBITO" className="cursor-pointer">
                Tarjeta Debito
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            disabled={!paymentMethod}
            className="cursor-pointer"
          >
            Confirmar pago
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
