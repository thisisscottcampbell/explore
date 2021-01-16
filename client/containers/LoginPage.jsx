import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import {
	FormHelperText,
	FormControl,
	FormLabel,
	Button,
	Input,
	Container,
	Text,
	Flex,
	useToast,
} from '@chakra-ui/react';

import Footer from '../components/Footer';
import { useAuth } from '../useAuth';

const LoginPage = () => {
	const auth = useAuth();

	// this sets the current state using the useState hook;
	const [currentUser, setCurrentUserField] = useState({
		username: '',
		password: '',
	});
	// this sets the toast parts according to errors/actions
	const [toastMessage, setToastMessage] = useState(undefined);

	const toast = useToast();
	const history = useHistory();

	useEffect(() => {
		if (toastMessage) {
			toast({
				title: toastMessage.title,
				description: toastMessage.description,
				status: 'warning',
				duration: toastMessage.duration,
				isClosable: true,
				position: 'top',
			});
		}
	}, [toastMessage, toast]);

	const handleInputChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCurrentUserField({ ...currentUser, [name]: value });
		// console.log(event.target.value);
	};
	// backend function passed down in props that will take the currentUser as input;

	const handleUserSubmit = (event) => {
		event.preventDefault();
		let title;
		let description;
		let duration;

		fetch('/api/member/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(currentUser),
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
				return res.json().then((data) => {
					throw data;
				});
			})
			.then((data) => {
				auth.signInFunc(data.user.id, data.user.username, () =>
					history.replace('/time/home')
				);
			})
			.catch((error) => {
				title = 'error';
				description = `${error.err}`;
				duration = 9000;
				setToastMessage({ title, description, duration });
			});
	};

	return (
				<Container
					// border="1px solid silver"
					my={2}
					maxW="300px"
					rounded="25px"
				>
					<Container marginBottom="1px solid silver" justifyContent="column">
						<form onSubmit={handleUserSubmit}>
							<FormControl isRequired>
								<FormLabel color='gray.50'>Username:</FormLabel>
								<Input
									id="username"
									onChange={handleInputChange}
									name="username"
									color='gray.50'
								/>
							</FormControl>
							<FormControl isRequired mt="10px">
								<FormLabel color='gray.50'>Password:</FormLabel>
								<Input
									id="password"
									onChange={handleInputChange}
									type="password"
									name="password"
									color='gray.50'
								/>
							</FormControl>
							<Button
								ml="80px"
								mt={4}
								colorScheme="teal"
								color="gray.50"
								type="submit"
							>
								Login
							</Button>
						</form>
					</Container>
					<Container>
						<Flex justifyContent="space-between" padding={5} color='gray.50'>
							<Text fontSize="12px">Do not have an account?</Text>
							<NavLink to="/signup">
								<Text fontSize="12px" textDecoration="underline">
									Sign up
								</Text>
							</NavLink>
						</Flex>
					</Container>
				</Container>
	);
};
export default LoginPage;
