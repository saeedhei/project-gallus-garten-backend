cd /p/gallusgarten-backend

sudo npm run build 

npm run serve


"serve": "cross-env NODE_ENV=production node dist/bin/www.js"

 "serve": "cross-env NODE_ENV=production pm2 start dist/bin/www.js --name GG-Backend --watch dist --watch-delay 1000"


pm2 logs GG-Backend

