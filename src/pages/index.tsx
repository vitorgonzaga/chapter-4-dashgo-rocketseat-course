import { Button, Flex, VStack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Input } from "../components/Form/Input";

// type SignInFormData = {
//   email: FieldValues;
//   password: FieldValues;
// }

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <VStack spacing="4" >
          <Input
            type="email"
            label="E-mail"
            error={errors.email?.message}
            { ...register("email") }
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password?.message}
            {...register("password")}
          />
        </VStack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
