import { Button, Flex, VStack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        p="8"
        borderRadius={8}
        bg='gray.800'
        direction="column"
      >
        <VStack spacing="4" >
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </VStack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">Entrar</Button>
      </Flex>
    </Flex>
  )
}
