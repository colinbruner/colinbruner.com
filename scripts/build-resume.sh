#!/bin/bash

cd static/resume
# Generate resume.txt
docker run -ti --rm -v $(pwd):/app bwits/pdf2txt resume.pdf > resume.txt
#TODO: Parse text, turn into yml/json?