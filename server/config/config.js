// ==================
// Puerto
// ==================
process.env.PORT = process.env.PORT || 3000


// ==================
// Entorno
// ==================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==================
// Token
// ==================
process.env.CADUCIDAD_TOKEN = '48h';

// ==================
// Entorno
// ==================
process.env.SEED = process.env.SEED || 'seed-dev'


// ==================
// Database
// ==================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



// ==================
// Google Client
// ==================
process.env.CLIENT_ID = process.env.CLIENT_ID || '353736331856-ij5q44i2embg1i221jdgiu6aet66rid4.apps.googleusercontent.com';