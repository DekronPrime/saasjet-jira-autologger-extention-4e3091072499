import express, { Express, Response, Request } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app: Express = express();

app.use(bodyParser.json());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world</h1>');
});

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

app.listen(8000);
