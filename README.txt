About EmoteControl
============
EmoteControl can be used to monitor one or multiple chosen emotions and perform a specified task once the emotion(s) reach a certain threshold. We chose created EmoteControl because we wanted to contribute something new to this very open field: we wanted to give users choices. Other BCI applications are meant for exactly one applicaton, so they are specifically useful to people for whom that one application is useful. We wanted ours to be useful to many people who would benefit from different uses of our application.

Our application has multiple options for which emotion to monitor. The user chooses one of these during setup. Currently we support 3 emotions: angry, distracted, and mellow. After selecting an emotion, the user chooses an action. We have 3 options right now: show an on-screen notification, play music, or set up a text. If the threshold of the chosen emotion is reached, the action will be executed. Each emotion--angry, distracted, and mellow--has a value, which is calculated according to standard algorithms (taken from other BCI research, such as the Affect Button) and our own tests and modifications.


Installation
=============
No building or installation necessary! Access the app using the following web link: https://emotecontrol-9acf2.firebaseapp.com/


Usage
=====
Click "Connect to Muse." A window should appear with available bluetooth devices; select your Muse and press connect. You will now have the option to "Begin Emoting!" Press the button to begin.

At first, there will be no readings. Please wait 5 to 10 seconds for the Muse to collect enough data to begin showing measurements. 

On the left, you will see the four waves being measured and your calculated levels of anger, distraction, and mellowness. 

The right side of the screen hosts your trigger creation. The first dropdown menu allows you to select an emotion. This is the emotion that you want the device to be paying attention to. You then select and intensity and an action that should be taken when that intensity is reached. Then press the "Add Trigger" button and toggle the "Enable Triggers" switch. Now, whenever your selected emotion reaches the specified intensity, the action will occur. 

For example, you might want to play music if you are becoming too distracted; you would choose "Distraction" as the emotion, "high" as the intensity, and "play music" as the action. After you add the trigger, your device will begin playing music once the Muse detects that you are distracted.

Toggle the Trigger Switch to enable trigger. After every trigger, the SWITCH TURNS OFF AUTOMATICALLY to prevent multiple triggers back to back. The user has to ENABLE THE SWITCH AGAIN.


About us
========
EmoteControl was created by Amber Gupta, Katie Zucker, and Carter Yancey for a CS491 BCI final project.

Source files can be found on github: https://github.com/agupta1897/EmoteControl

Watch our video!!