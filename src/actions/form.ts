"use server";

import * as z from "zod";
// import { useServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

class UserNotFoundError extends Error {}

export const getFormsStats = async () => {
  // const user = await useServerCurrentUser();
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  const stats = await db.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bouceRate,
  };
};

export const createForm = async (values: z.infer<typeof FormSchema>) => {
  // const user = await useServerCurrentUser();
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  const validatedFields = FormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Formulario inválido!" };
  }

  const { name, description } = validatedFields.data;

  const form = await db.form.create({
    data: {
      userId: user.id,
      name,
      description,
      content: "[]",
    },
  });

  if (!form) {
    return { error: "No se pudo guardar el formulario!" };
  }

  revalidatePath("/home");
  return {
    id: form.id,
  };
};

export const getForms = async () => {
  // const user = await useServerCurrentUser();
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  const forms = await db.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return forms;
};

export const getFormById = async (id: string) => {
  // const user = await useServerCurrentUser();
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  const form = await db.form.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return form;
};

export const updateFormContent = async (id: string, jsonValue: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  revalidatePath("/builder");

  return await db.form.update({
    where: {
      userId: user.id,
      id: id,
    },
    data: {
      content: jsonValue,
    },
  });
};

export const publishForm = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new UserNotFoundError();

  revalidatePath("/builder");

  return await db.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
};
