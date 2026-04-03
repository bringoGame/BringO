#!/bin/bash
cd /home/site/wwwroot
npm install --production=false
npm run build
node dist/server/entry.mjs
