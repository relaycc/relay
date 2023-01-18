import type { NextPage } from "next";
import { CardContainer } from "components/pages/CardContainer";
import { client, Project, isProject } from "lib";

export const getServerSideProps = async (): Promise<{
  props: {
    projects: Project[];
  };
}> => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort", { ascending: true });

  const processed = (() => {
    if (data === null) {
      console.warn('Data fetched for projects is null, returning empty array"');
      return [];
    } else if (error !== null) {
      console.error("Error fetching projects", error);
      return [];
    } else {
      return data.filter(isProject);
    }
  })();

  return {
    props: {
      projects: processed,
    },
  };
};

const Home: NextPage<{ projects: Project[] }> = ({ projects }) => {
  return <CardContainer projects={projects} />;
};

export default Home;
