"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Form } from "@prisma/client";
import PreviewDialogButton from "./preview-dialog-button";
import SaveFormButton from "./save-form-button";
import PublishFormButton from "./publish-form-button";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import useDesaignerContext from "../hooks/use-designer-context";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import Confetti from "react-confetti";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface Props {
  form: Form;
}

const FormBuilder: React.FC<Props> = ({ form }) => {
  const { setElements } = useDesaignerContext();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsReady(true);
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  const sharedUrl = `${window.location.origin}/submit/${form.sharedUrl}`;

  if (form.published) {
    return (
      <>
        <Confetti
          recycle={false}
          height={window.innerHeight}
          width={window.innerWidth}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="max-w-xl">
            <h1 className="text-4xl text-center border-b font-bold text-primary pb-2 mb-10">
              🎆Formulario publicado🎆
            </h1>
            <h2 className="text-2xl">Compartir este formulario</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Cualquiera que tenga el enlace puede ver y enviar el formulario.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center border-b pb-4 w-full">
              <Input className="w-full" readOnly value={sharedUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(sharedUrl);
                  toast({
                    title: "Enlace copiado",
                    description: "Enlace copiado al portapapeles",
                  });
                }}
              >
                Copiar enlace
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href={"/home"} className="gap-2">
                  <BsArrowLeft />
                  Volver al inicio
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Detalles
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        {/* {isReady ? (
          <> */}
        <nav className="flex flex-col sm:flex-row items-center justify-between border-b-2 py-4  px-2 sm:px-20 gap-3 ">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground pr-2">Fromulario:</span>
            {form.name}
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <div className="flex gap-2">
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </div>
            )}
          </div>
        </nav>

        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto p-4 bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
        {/* </>
        ) : ( */}
        {/* <div className="flex flex-col items-center justify-center w-full h-full">
            <ImSpinner2 className="animate-spin w-12 h-12" />
          </div>
        )} */}
      </main>
      {isReady && <DragOverlayWrapper />}
    </DndContext>
  );
};

export default FormBuilder;
