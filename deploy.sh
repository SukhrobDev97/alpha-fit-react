#! /bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm use 18
export PATH="$HOME/.npm-global/bin:$PATH"
#Production
git reset --hard
git checkout main
git pull origin main

npm i yarn -g
yarn global add serve
yarn 
yarn run build
pm2 start "yarn run start:prod" --name "ALPHAFIT-REACT"