const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const moment = require('moment');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files
app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
  });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Zoo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Import routes
const homeRoutes = require('./routes/home')
const hranaRoutes = require('./routes/hrana');
const vrstaOdrzavanjaRoutes = require('./routes/vrsta_odrzavanja');
const podrucjaRoutes = require('./routes/podrucja');
const pozicijaRoutes = require('./routes/pozicija');
const zaposleniciRoutes = require('./routes/zaposlenici');
const smjestajRoutes = require('./routes/smjestaj');
const vrsteZivotinjaRoutes = require('./routes/vrste_zivotinja');
const zivotinjeRoutes = require('./routes/zivotinje');
const ulazniceRoutes = require('./routes/ulaznice');
const odrzavanjeRoutes = require('./routes/odrzavanje');
const hranjenjeRoutes = require('./routes/hranjenje');

// Use routes
app.use('/', homeRoutes);
app.use('/hrana', hranaRoutes);
app.use('/vrsta_odrzavanja', vrstaOdrzavanjaRoutes);
app.use('/podrucja', podrucjaRoutes);
app.use('/pozicija', pozicijaRoutes);
app.use('/zaposlenici', zaposleniciRoutes);
app.use('/smjestaj', smjestajRoutes);
app.use('/vrste_zivotinja', vrsteZivotinjaRoutes);
app.use('/zivotinje', zivotinjeRoutes);
app.use('/ulaznice', ulazniceRoutes);
app.use('/odrzavanje', odrzavanjeRoutes);
app.use('/hranjenje', hranjenjeRoutes);

// Root route
app.get('/', (req, res) => {
    res.render('/home');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
