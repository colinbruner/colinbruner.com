#!/bin/bash -e

hugoEnv=${hugoEnv:-"devel"}
baseURL=${baseURL:-"https://develop.colinbruner.com"}

echo "[Info]: Building site for environment: '$hugoEnv' with baseURL: '$baseURL'"

hugo \
    --minify \
    --gc \
    --logLevel info \
    -e $hugoEnv \
    --baseURL $baseURL