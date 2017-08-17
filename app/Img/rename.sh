#!/bin/sh

i=1
for file in `find . -type f -name "*.jpg"`;do
mv $file ${i}.jpg
((i=${i}+1))
done
