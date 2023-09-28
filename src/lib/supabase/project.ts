export const CATEGORIES = [
  "general",
  "infrastructure",
  "defi",
  "dao",
  "music",
  "venture",
  "impactdao",
  "lens",
  "identity",
  "events",
  "zk",
  "daotool",
] as const;

export type ProjectCategory = (typeof CATEGORIES)[number];

export const CATEGORY_DISPLAY = {
  general: "General",
  new: "New",
  venture: "Venture",
  lens: "Lens",
  identity: "Identity",
  events: "Events",
  music: "Music",
  impactdao: "Impact DAOs",
  defi: "DeFi",
  dao: "DAO",
  zk: "ZK",
  daotool: "DAO Tools",
  infrastructure: "Infrastructure",
} as const;

export const categoryToDisplay = (
  category: ProjectCategory
): (typeof CATEGORY_DISPLAY)[ProjectCategory] => {
  return CATEGORY_DISPLAY[category];
};

export const isProjectCategory = (obj: unknown): obj is ProjectCategory => {
  if (typeof obj !== "string") {
    return false;
  }
  return CATEGORIES.includes(obj as ProjectCategory);
};

export interface Project {
  id: string;
  name: string;
  url: string;
  logo: string;
  handle: string | null;
  description: string;
  sort: number;
  category: ProjectCategory;
}

export const fromListToByCategory = (
  list: Project[]
): Record<Project["category"], Project[]> => {
  const result: Record<Project["category"], Project[]> = {
    general: [],
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
