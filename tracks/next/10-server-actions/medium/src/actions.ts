"use server";

import { updateTag } from "next/cache";
import { persistProjectTitle } from "./project-store";
import { currentSession } from "./security";

export type UpdateProjectState =
  | { readonly status: "success"; readonly projectId: string }
  | { readonly status: "validation-error"; readonly message: string }
  | { readonly status: "forbidden" };

export async function updateProject(formData: FormData): Promise<UpdateProjectState> {
  const session = await currentSession();
  if (!session) return { status: "forbidden" };
  const projectId = String(formData.get("projectId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!projectId || title.length < 3 || title.length > 80) {
    return { status: "validation-error", message: "Nieprawidłowe dane projektu" };
  }

  await persistProjectTitle(projectId, title);
  updateTag(`user:${session.userId}:projects`);
  updateTag(`project:${projectId}`);
  return { status: "success", projectId };
}
