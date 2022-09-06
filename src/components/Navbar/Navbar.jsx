import React, {ReactNode} from 'react'
import {Flex, Box, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Heading, AvatarBadge} from '@chakra-ui/react'


const Links = ['Sports', 'Tech', 'Education', 'About', 'Teams', 'Contact'];
const NavLink = ({children}, {children: ReactNode}) => (
    <Link px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none', border: 'none', outline: 'none', bg: useColorModeValue('grey.200', 'grey.700')}} href={'#'}>
        {children}
    </Link>
)

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton size={'md'} icon={isOpen ? 'close icon' : 'hamburger icon'} aria-label={'open-menu'} display={{md: 'none'}} onClick={isOpen ? onClose : onOpen} />

                <HStack spacing={10}>
                    <Box><Heading as='h4' size='md'>Cody's Blog</Heading></Box>
                    <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
                        {Links.map((link) => (<NavLink key={link}>{link}</NavLink>))}
                    </HStack>
                </HStack>

                <Flex alignItems={'center'}>
                    <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} >Create</Button>

                    <Menu>
                        <MenuButton as={'button'} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar src='' size={'sm'} >
                                <AvatarBadge bg='green.500' boxSize='1.25em' />
                            </Avatar>
                        </MenuButton>

                        <MenuList>
                            <MenuItem>Account</MenuItem>
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (<Box pb={4} display={{md: 'none'}}><Stack as={'nav'} spacing={4}>{Links.map((link) => (<NavLink key={link}>{link}</NavLink>))}</Stack></Box>) : null}
        </Box>
    </>
  )
}

export default Navbar