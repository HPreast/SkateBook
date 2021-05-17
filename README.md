# SkateBook
SkateBook is an app that allows skateboarders to visualize and track their progression as well as post journal entries recording progression and making notes of any major milestones. Users are also able to follow and interact with other users through the newsfeed on the homepage.When a user creates a profile they will have the abilitiy to view our list of tricks which include a description, tips, and a how to video for each trick in the list. When the user finds a trick they are confident with, they are able to add it to the library. When a user finds a trick they would like to work on, they can add it to their practice list. Users are able to modify their library and practice lists, whether they would like to remove a trick from the list completely or send it to the other list based on if the user needs more practice or is starting to feel confident with a new trick.

## Home Page
While on the home page, the user is able to view and modify their library and practice list as well as view and modify their journal entries from the newsfeed. If the user has followed any otherr users then they will also be able to like or comment on posts from users they follow.

## Trick List
The Trick List page includes the list of trick cards that when selected will route the user to a trick details view allowing the user to view a description, tips, and how to video for each trick. If the user decides they would like to add the trick to one of their lists then the user is able to select an affordance to send the trick to the desired list.

## My Profile
When a userr is viewing their profile, they will be shown a list of people the user follows, the users profile information, a section showing the user's past journal entries which can be modified, as well as both the users library and practice list which can also be modified from this view.<hr></hr>

## Technologies
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>React</li>
<li>JSON Server</li>
</ul>
<hr></hr>

## How to Run the App
In your terminal, navigate to the directory you wish to create the app in and type:

`git@github.com:HPreast/SkateBook.git`

Once you've cloned it down, cd into that directory and install the additional dependancies by running:

`npm install`

Once everything is installed cd to the source directory and run:

`npm start`

Next open another tab in your terminal and cd into the API directory from source and run:

`json-server -p 8088 -w database.json`

## WireFrame
<img src="public\SkateBookWireFrame.PNG">
## ERD
<img src="public\SkateBookERD.PNG">
