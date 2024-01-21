import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}
const PublishFormButton: React.FC<Props> = ({ id }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const submitPublishForm = async () => {
    try {
      await publishForm(id);

      toast({
        title: "Formulario publicado",
        description: "Se ha publicado el formulario correctamente",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se ha podido publicar el formulario",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-t from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="w-6 h-6" />
          Publicar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Después de publicar su formulario,
            no podrá editar este formulario. <br />
            <br />
            <span className="font-medium">
              Al publicar este formulario, lo pondrá a disposición del público y
              podrá recopilar envíos.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(submitPublishForm);
            }}
          >
            Publicar {loading && <FaIcons className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
