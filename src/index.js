require('./config/db').connect();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const port = 3000;

const app = express();

const siteRoutes = require('./routes/site.route');
const newsRoutes = require('./routes/news.route');
const courseRoutes = require('./routes/course.route');
const meRoutes = require('./routes/me.route');

// Setup template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b
    }
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Global middlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', siteRoutes);
app.use('/news', newsRoutes);
app.use('/courses', courseRoutes);
app.use('/me', meRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
