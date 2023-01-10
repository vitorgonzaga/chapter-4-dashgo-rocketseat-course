import { Flex, Icon, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps {
  icon: ElementType,
  children: string,
  href: string,
}

export function NavLink({ icon, children, href }: NavLinkProps) {
  return(
    <ActiveLink href={href} passHref >
      <Flex display="flex" alignItems="center"  >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </Flex>
    </ActiveLink>
  )
}