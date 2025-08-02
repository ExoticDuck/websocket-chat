npm run lint
npm run type-check
npm run build

LOGSTRING=$(git log)
COMMIT=$(echo $LOGSTRING | awk '{print $2}')

cd dist

git init
git add -A
git commit -m "deploy (commit: $COMMIT)"

git push -f https://github.com/ExoticDuck/learn-js.git master:gh-pages

cd ..