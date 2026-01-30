@echo off
REM Run Android build with Android Studio's JDK

REM Set Java to Android Studio's bundled JDK
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%JAVA_HOME%\bin;%PATH%

REM Show Java version
echo Using Java version:
java -version
echo.

REM Run the build
echo Running Android emulator build...
npm run cap:run:emulator
