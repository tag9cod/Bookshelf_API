const { tambahbuku, tampilbuku, detailbuku, editbuku, hapusbuku } = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: tambahbuku,
	},

	{
		method: 'GET',
		path: '/books',
		handler: tampilbuku,
	},

	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: detailbuku,
	},

	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: editbuku,
	},

	{
		method: 'DELETE',
		path: '/books/{bookId}',
		handler: hapusbuku,
	},
	
];

module.exports = routes;