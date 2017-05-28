#!/bin/bash

echo "-------------------------------------"
echo "Deploying to gh-pages branch         "
echo "-------------------------------------"

dist=../dist/             # tmp dist directory

# Build the content of the website into dist-build folder
rm -rf $dist

# Cloning gh-pages branch into dist folder
git clone -b gh-pages https://github.com/binout/soccer-admin.git $dist

# Build app
npm run build

# Clean old resources
rm -rf $dist/static/css
rm -rf $dist/static/js
rm -rf $dist/static/media

# Add new resources
cp -R build/* $dist
cd $dist
git add .

# Pushing to gh-pages branch
if [ $(git ls-files --deleted | wc -l) -ne 0 ]; then git ls-files --deleted | sed -e 's/^/"/g' -e 's/$/"/g' | xargs git rm; fi;
git commit -m "Auto-deploy - dist"
git push origin gh-pages

# Clean generated folders
cd ..
rm -rf $dist
rm -rf build
