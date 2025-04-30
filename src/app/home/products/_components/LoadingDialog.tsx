import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const LoadingDialog = ({
  open,
  progress,
}: {
  open: boolean;
  progress: number;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subiendo imagen...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
