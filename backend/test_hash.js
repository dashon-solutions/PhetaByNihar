import bcrypt from 'bcryptjs';

const hash = '$2a$10$M8.uiY8wl8G3NeJx6uIwNulxbug529qNZl6lNVecJORmgxAZv7dIu';
const match = bcrypt.compareSync('admin123', hash);
console.log('Does "admin123" match the hash?', match);
