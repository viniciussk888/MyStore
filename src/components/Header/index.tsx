import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { Logo } from "./Logo";
import { CartNav } from "./CartNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      <Logo />
      <SearchBox />

      <Flex align="center" ml="auto">
        <CartNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
