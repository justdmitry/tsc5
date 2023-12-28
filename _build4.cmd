@echo off
npx blueprint build Task4 && npx func-js ./contracts/task4.fc --boc ./build/task4.boc --fift ./build/task4.fift && npx blueprint test