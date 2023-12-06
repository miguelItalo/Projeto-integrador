const express = require('express')
const expbhs = require('express-handlebars')
const app = express()
const session = require("express-session")
const flash = require("express-flash")
const FileStore = require("session-file-store")(session)
const port = 9998
const conn = require('./db/conn')

// ROTAS
const empresaRoutes = require("./routes/empresaRouter")
const authrRoutes = require('./routes/authrRoutes')
const locaisRoutes = require('./routes/locaisRoutes')
const produtosRoutes = require('./routes/produtosRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', expbhs.engine())
app.set('view engine', 'handlebars')

app.use(session({
	name: 'session',
	secret: 'nosso_secret', // Quanto maior a crypto melhor
	resave: false,
	saveUninitialized: false,
	store: new FileStore({
		logFn: function () {

		},
		path: require('path').join(require('os').tmpdir(), 'sessions')
	}),
	cookie: {
		secure: false,
		maxAge: 360000,
		expixes: new Date(Date.now() + 360000),
		httpOnly: true
	}
}));

// Import as flash
app.use(flash());

app.use(express.static('public'))

app.use((req, res, next) => {
	if (req.session.userId) {
		res.locals.session = req.session
	};
	next();
});

app.use('/', authrRoutes)
app.use('/locais', locaisRoutes)
app.use('/produtos', produtosRoutes)
app.use("/empresa", empresaRoutes)

conn.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`http://localhost:${port}`)
		})
	})
	.catch((err) => console.log(err))