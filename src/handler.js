const { nanoid } = require('nanoid');
const {books} = require('./books');

// simpan data
const tambahbuku = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,

	} = request.payload;

	const id = nanoid(16);
	const finished = readPage === pageCount;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		insertedAt,
		updatedAt,
	};

	books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			}
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	});
	response.codes(500);
	return response;

	if (!name){
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response
	}
	
};

//Menampilkan semua Buku
const tampilbuku = (request, h) => {
	const {
		name,
		reading,
		finished
	} = request.query;

	if (books.length === 0) {
		const response = h.response({
			status: 'success',
			data: {
				books: [],
			},
		});
		response.code(200);
		return response;
	}

	let filterbook = books;
	if (typeof name !== 'undefined') {
		filterbook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
	}

	if (typeof reading !== 'undefined') {
		filterbook = books.filter((book) => Number(book.reading) === Number(reading));
	}

	if (typeof finished !== 'undefined') {
		filterbook = books.filter((book) => Number(book.finished) === Number(finished));
	}

	const lisBook = filterbook.map((book) => ({
		id: book.id,
		name: book.name,
		publisher: book.publisher,
	}));
	const response = h.response({
		status: 'success',
		data: {
			books: lisBook,
		},
	});
	response.code(200);
	return response;
};

//menampilkan detail buku
const detailbuku = (request, h) => {
	const {bookId} = request.params;
	const book = books.filter((n) => n.id === bookId) [0];

	if (book !== undefined) {
		return {
			status: 'success',
			data: {
				book,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
	response.code(404);
	return response;
};

//Mengedit Buku
const editbuku = (request, h) => {
	const {bookId} = request.params;
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === bookId);

	if (!name) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}

	if (index !== -1) {
		const finished = pageCount === readPage;
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			finished,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	});
	response.code(404);
	return response;

};

// Menghapus Buku
const hapusbuku = (request, h) => {
	const {bookId} = request.params;
	const index = books.findIndex((book) => book.id === bookId);

	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

module.exports = {tambahbuku, tampilbuku, detailbuku, editbuku, hapusbuku };