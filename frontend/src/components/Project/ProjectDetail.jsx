import {
  Button,
  Center,
  Container,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateProjectModal } from "./AddUpdateProjectModal";

export const ProjectDetail = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current) return;
    fetchProject();
    isMounted.current = true;
  }, [projectId]);

  const fetchProject = () => {
    setLoading(true);
    axiosInstance
      .get(`/project/${projectId}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const delateProject = () => {
    setLoading(true);
    axiosInstance
      .delete(`/project/${projectId}`)
      .then(() => {
        toast({
          title: "Проект успешно удален",
          status: "success",
          isClosable: true,
          diration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Ошибка при удалении проекта",
          status: "error",
          isClosable: true,
          diration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container mt={6}>
        <Button
          colorScheme="gray"
          onClick={() => navigate("/", { replace: true })}
        >
          Назад
        </Button>
      </Container>
      <Container
        bg={background}
        minHeight="7rem"
        my={3}
        p={3}
        rounded="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={22}>{project.title}</Text>
        <Text bg="gray.500" mt={2} p={2} rounded="lg">
          {project.description}
        </Text>
        <AddUpdateProjectModal
          my={3}
          editable={true}
          defaultValues={{
            title: project.title,
            description: project.description,
            status: project.status,
          }}
          onSuccess={fetchProject}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={delateProject}
        >
          Удалить
        </Button>
      </Container>
    </>
  );
};
