@echo off
REM Open the application in the default web browser
start http://localhost:3000

REM Navigate to the project directory
cd  ../pkg

REM Start the Firebase emulators in a new command window
start cmd /k firebase emulators:start --import ./database --export-on-exit=./database

REM Wait for the Firebase emulator to fully start
timeout /t 5

REM Then, start the development server in a new command window
start cmd /k yarn start
