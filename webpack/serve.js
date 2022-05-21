import express from 'express';

import path, { join }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(join(__dirname, '../public')));
app.use(express.static('./dist'));

app.listen(port, () => console.log(`App running on ${port}.`));
