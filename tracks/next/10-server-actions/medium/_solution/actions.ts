"use server";

import { updateTag } from "next/cache";
import { persistProjectTitle } from "./project-store";
import { canEditProject, currentSession } from "./security";

export type UpdateProjectState =
  | { readonly status: "success"; readonly projectId: string }
  | { readonly status: "validation-error"; readonly message: string }
  | { readonly status: "forbidden" };

export async function updateProject(formData: FormData): Promise<UpdateProjectState> {
  const session = await currentSession();
  if (!session) return { status: "forbidden" };
  const rawProjectId = formData.get("projectId");
  const rawTitle = formData.get("title");
  const projectId = typeof rawProjectId === "string" ? rawProjectId.trim() : "";
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  if (!projectId || title.length < 3 || title.length > 80) {
    return { status: "validation-error", message: "Nieprawidłowe dane projektu" };
  }
  if (!(await canEditProject(session.userId, projectId))) {
    return { status: "forbidden" };
  }

  await persistProjectTitle(projectId, title);
  updateTag(`user:${session.userId}:projects`);
  updateTag(`project:${projectId}`);
  return { status: "success", projectId };
}
