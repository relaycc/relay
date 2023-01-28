export const CATEGORIES = [
  "general",
  "new",
  "venture",
  "lens",
  "identity",
  "events",
  "music",
  "impactdao",
  "defi",
  "dao",
  "zk",
  "daotool",
  "infrastructure",
] as const;

export interface Project {
  id: string;
  name: string;
  url: string;
  logo: string;
  handle: string | null;
  description: string;
  sort: number;
  category: typeof CATEGORIES[number];
}

export const fromListToByCategory = (
  list: Project[]
): Record<Project["category"], Project[]> => {
  const result: Record<Project["category"], Project[]> = {
    general: [],
    new: [],
    venture: [],
    lens: [],
    events: [],
    identity: [],
    music: [],
    impactdao: [],
    defi: [],
    dao: [],
    zk: [],
    daotool: [],
    infrastructure: [],
  };
  list.forEach((project) => {
    result[project.category].push(project);
  });
  return result;
};

export const isProject = (obj: unknown): obj is Project => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  if (typeof (obj as Project).id !== "string") {
    return false;
  }
  if (typeof (obj as Project).name !== "string") {
    return false;
  }
  if (typeof (obj as Project).url !== "string") {
    return false;
  }
  if (typeof (obj as Project).logo !== "string") {
    return false;
  }
  if (
    (obj as Project).handle !== null &&
    typeof (obj as Project).handle !== "string"
  ) {
    return false;
  }
  if (typeof (obj as Project).description !== "string") {
    return false;
  }
  if (typeof (obj as Project).sort !== "number") {
    return false;
  }
  if (typeof (obj as Project).category !== "string") {
    return false;
  }
  return true;
};
