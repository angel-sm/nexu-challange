import express, { Express } from 'express';
import cors from 'cors';
import { ModelRoutes } from './routes/Model/model.routes';

class Server {
  public app: Express;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeRoutes(): void {
    new ModelRoutes(this.app).run();
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((layer: { route: any }) => layer.route)
      .map((layer: { route: { methods: {}; path: any } }) => ({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path,
      }));

    console.table(routes);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });

    this.listRoutes();
  }
}

export default Server;
