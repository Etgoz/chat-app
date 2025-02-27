import { Message } from "../types/message";
import { User } from "../types/user";
import { mockUsers } from "../assets/mockUsers"; // todo: remove this line after server implementation

const endpoint = "http://localhost:3003"; // todo: add endpoint (server) address (starting with http://)

/**
 * GET Request to get the list of messages
 **/
export async function getMessages(): Promise<Message[]> {
	// todo: replace this with fetch to get the messages from the server
	// const { mockMessages } = await import(`${endpoint}/mockMessages`);
	const response = await fetch(`${endpoint}/mockMessages`, {
		mode: "cors",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	const { mockMessagesWithNames } = await response.json();

	// todo: this should be implemented in the server. Chat Messages should already have the authors' names.
	// todo: remove this mapping when getting the data from the server
	// const mockMessagesWithNames = mockMessages.map((message: Message) => {
	// 	const author = mockUsers.find((user) => user.id === message.authorId);
	// 	const authorName = author && author.name;
	// 	return { ...message, authorName };
	// });

	return mockMessagesWithNames;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers(): Promise<User[]> {
	// todo: replace this with fetch to get the user list from the server
	// const { mockUsers } = await import(`${endpoint}/mockUsers`);
	const response = await fetch(`${endpoint}/mockUsers`, {
		mode: "cors",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	const { usersList } = await response.json();
	return usersList;
}

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
	// todo: replace this with fetch to get the user details from the server.
	//  For mocking example, we're calling an external JSON service.
	//  You can use mockUserDetails.ts for the list of user details in the server.
	const res = await fetch(`${endpoint}/users?id=${userId}`, {
		mode: "cors",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	return await res.json();
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
	// todo: implement sending a new message to the server
	const body = message ? JSON.stringify(message) : null;
	const response = await fetch(`${endpoint}/addMessage`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Access-Control-Allow-Origin": "*",
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body,
	});
	const messageResponse = await response.json();

	if (messageResponse.status === 200) {
		const okMessage = {
			...messageResponse.body,
			status: "ok",
		};
		return okMessage;
	}
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(
	messageId: number,
	userId: number,
	like: boolean
) {
	// todo: implement sending a rquest to change the like of a message by the user
	const response = await fetch(`${endpoint}/changeLikes`, {
		mode: "cors",
		method: "POST",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			messageId,
			userId,
			like,
		}),
	});
	const confirm = await response.json();
	return confirm;
}
