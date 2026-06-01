import express from 'express';
import AdminJS from 'adminjs';
import cors from 'cors';
import path from 'path';
import { buildAuthenticatedRouter } from '@adminjs/express';
import "dotenv/config";

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';

import { galleryRouter } from './routes/galleryRoutes.js';
import { menuRouter } from './routes/menuRoutes.js';
import { popupRouter } from './routes/popupRoutes.js';

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();
  app.use(cors());

  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  app.use(admin.options.rootPath, router);
  app.use(express.static('public'));
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  app.use("/gallery", galleryRouter);
  app.use('/menu', menuRouter);
  app.use('/popup', popupRouter);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
