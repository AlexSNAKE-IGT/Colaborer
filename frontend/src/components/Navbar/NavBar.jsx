import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBar = () => {
  const { logout } = useAuth();
  return (
    <Box minHeight="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={useColorModeValue("green.300", "green.600")}
        color="white"
      >
        <Text as="h2" fontSize={24} fontWeight="bold">
          COLABORER
        </Text>
        <Stack direction="row" align="center" spacing={4}>
        <Text as="h2" fontSize={12} fontWeight="bold">
          ИКОНКА
        </Text>
          <ThemeToggler size="lg" />
          <Button onClick={logout} colorScheme="green">
            Профиль
          </Button>
          <Button onClick={logout} colorScheme="green">
            Проекты
          </Button>
          <Button onClick={logout} colorScheme="green">
            Поиск
          </Button>
          <Button onClick={logout} colorScheme="green">
            Чаты
          </Button>
          <Button onClick={logout} colorScheme="red">
            Выйти
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};
