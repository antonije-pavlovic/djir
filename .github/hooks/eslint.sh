#!/bin/bash

echo "Looking for lint errors..."

npm run lint


if [[ "$?" == 0 ]]; then
    echo "ESlint Passed!"
else
    echo "ESLint Failed!"
    exit 1
fi