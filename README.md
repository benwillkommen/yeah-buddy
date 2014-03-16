#Yeah Buddy!

1. Be logged into fitocracy
2. Open chrome console
3. Copy/paste the contents of fitocracyRepPRs.js 
4. Figure out the activityId of the exercise you want to look up rep PRs for. you can do this by looking at network traffic in the "You -> Performance" section of the site (this script uses the same endpoint that the performance graphs use). chrome dev tools noobs, check out this highly sophisticated diagram: http://i.imgur.com/TvImk93.png
5. Change the parameter passed in to the id of whatever exercise you looked up in step 4. this gist is passing in an activityId of "1" on line 26, which happens to be bench press (lol @ bench press having an id of 1. bro level: xenowang/dicktalens).
6. Run it and enjoy your json of PRs!
