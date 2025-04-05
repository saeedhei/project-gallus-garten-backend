npx express-generator --view=pug seointro

npx npm-check-updates -u
or
npm install -g npm-check-updates
ncu
ncu -u
npm install

change directory: > cd seointro

install dependencies: > npm install

MacOS or Linux
DEBUG=myapp:* npm start
windows
set DEBUG=seointro:* & npm run dev

https://github.com/coreybutler/nvm-windows/releases
nvm-setup.exe
nvm version
nvm list available
nvm install 16.20.0
nvm install 22.14.0
nvm use 22.14.0
node -v
echo 22.13.1 > .nvmrc
nvm use 22.11.0
nvm list
nvm uninstall 22.12.0

npm ls inflight glob
npm outdated
npm update

git add .
git commit -m "npm run dev fixed"
git push origin main

git pull origin main



connections.ts
couchHelper.ts
userRepository.ts
userService.ts
userController.ts


npm install --omit=dev


# If you don’t need your local changes, reset the file:
git checkout -- src/routes/gallery.ts
git pull origin main