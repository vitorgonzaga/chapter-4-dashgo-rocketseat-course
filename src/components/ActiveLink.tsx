import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

/**
 * ReactNode
 * quando vc quiser receber além de component outros tipos de dados
 * utilizado quando o componente atua como um "wrapper"
 *
 */

 /**
  * React Element
  * quando o children deve ser apenas um componente react
  * No caso abaixo, o children será argumento da função cloneElement
  * que só trabalha com components React, logo, a tipagem deve ser ReacElement.
  */

interface ActiveLinkProps extends LinkProps {
  children: ReactElement,
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
  let isActive = false

  const { asPath } = useRouter()

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (!shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) ||
     asPath.startsWith(String(rest.as)))) {
      isActive = true
     }

  return (
    <Link {...rest}>
      { cloneElement(children, {
        color: isActive ?? "pink.400"
      })}
    </Link>
  )
}