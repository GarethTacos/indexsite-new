// src/routes/api/todos/+server.js
import { json } from '@sveltejs/kit';

// In a real app, you'd connect to a database
const todos = {"status": "SVELTE REWRITEEEE YAYAAAAYYYYY", "version": "0.1.0-SV-BETA"};

// GET example
export function GET() {
	return json(todos);
}

// POST example
/*export async function POST({ request }) {
	const newTodo = await request.json();
	newTodo.id = todos.length + 1;
	todos.push(newTodo);
	return json(newTodo, { status: 201 });
}*/

// PUT and DELETE for a specific item (dynamic route)
// You would use a dynamic route like src/routes/api/todos/[id]/+server.js
// For a PUT request to update an item:
/*export async function PUT({ params, request }) {
	const { id } = params;
	const { text, completed } = await request.json();
	const todo = todos.find((t) => t.id === parseInt(id));
	if (todo) {
		todo.text = text ?? todo.text;
		todo.completed = completed ?? todo.completed;
		return json(todo);
	}
	return new Response(null, { status: 404 });
}*/

// For a DELETE request to delete an item:
/*export function DELETE({ params }) {
	const { id } = params;
	const initialLength = todos.length;
	todos = todos.filter((t) => t.id !== parseInt(id));
	if (todos.length < initialLength) {
		return new Response(null, { status: 204 });
	}
	return new Response(null, { status: 404 });
}*/
