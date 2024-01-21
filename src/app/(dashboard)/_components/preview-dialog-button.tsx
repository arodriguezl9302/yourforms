import React from "react";
import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";
import useDesaignerContext from "../hooks/use-designer-context";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FormElements } from "./form-elements";

const PreviewDialogButton = () => {
  const { elements } = useDesaignerContext();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="gap-2">
          <MdPreview className="w-6 h-6" />
          Previsualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="font-bold text-lg text-muted-foreground">
            Previsualización
          </p>
          <p className="text-sm text-muted-foreground">
            Asi es como van a ver los usuario este formulario
          </p>
        </div>
        <div className="bg-accent flex flex-grow flex-col items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col flex-grow gap-6 bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;
