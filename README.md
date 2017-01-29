# Harassment Tracker

Companion App to the Street Harassment Awareness Project

Contact : [SZS](mailto:s@szs.io)

## Running the Project

 - Start Android Studio -> AVD Manager -> select your aVD and click Start from action
 - inside the directory where you want to create your new project, open your command line and run:

        $ git clone git@github.com:tijptjik/htracker.git 
        $ cd htracker/HarassmentTracker
        $ npm install
        $ react-native start 

 - Open a new command prompt and run the following inside the same directory(you just created) to launch the app on your AVD.

        $ react-native run-android

 - If everything is set up correctly, you should see your new app running in your Android emulator shortly.

 - You'll find in the file index.android.js in the home directory of your project, the last line contians the App registry using the same name you used in the first command above