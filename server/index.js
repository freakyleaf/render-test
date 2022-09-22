import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import timeout from 'connect-timeout';
import 'dotenv/config';

import attributeRoutes from './routes/api/attribute.js';
import tagRoutes from './routes/api/tag.js';

const port = process.env.PUBLIC_SERVER_PORT_NUMBER;

const app = express();
mongoose.connect(process.env.DB_CONNECTION, () => console.info('DB Connected'));

app.use(cors());
app.use(timeout('30s'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server home page');
});

app.use('/api/attribute', attributeRoutes);
app.use('/api/tag', tagRoutes);

app.listen(port, () => console.info(`Server running on port ${port}`));
