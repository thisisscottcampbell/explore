import React from 'react';

const SearchDrawer = (props) => {
	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size="lg"
		>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader background="teal.50" fontSize="2xl">
						Add Your Adventure
					</DrawerHeader>
					<DrawerBody>
						<FormControl>
							<FormLabel>Know What You're Looking For?</FormLabel>
							<input />
						</FormControl>
						<Flex mt={5}>
							<Button colorScheme="purple" m={1} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="teal"
								leftIcon={<RiAddCircleFill />}
								onClick={onSubmit}
								m={1}
							>
								Add Trip
							</Button>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
};

export default SearchDrawer;
