# Blissful Balance
Created by: Hans Bachman

## Description

Blissful Balance works as a tool to manage time and as a reminder of how long you've been in different spaces. While it's open in the background, it keeps track of how much time you've been away from the tab and extends the page accordingly. The aim of this feature was to build consciousness through tedious amounts of scrolling (something you were likely doing on another site anyways). The blank space builds into the consideration as there is nothing overly stimulating in between the top ui elements and the bottom meditative elements. Through this, the long time it takes to scroll also acts as a break for the user, providing that blissful balance where you can take a moment to yourself while not interrupting your productive workflow.

As for the meditative elements, the animation present at the bottom of the page was animated in a way that was meant to mirror the movements of the chest while breathing. This acts as a guide for the user to breathe along with. Added to this, the animations present on <em>most</em> of the text is meant to not be jarring or invasive to the calm viewing experience. 

The background colour was intentionally chosen to be a gradient, skewing and hiding just how far you've scrolled down on the page. Adding to this is the removal of the scroll bar to build this message. It's easy to lose just how much time you've spent scrolling the web so I wanted to hide how much time you had to take a break as well. Once again, this acts as a reflection for the user to consider how long they've spent on the web or other applications.

Anime.js was a little strange to learn but I found it straightforwards with the help of their wonderful documentation. Creating smooth, and fun animations is pretty easy with the built in functions, and using multiple on top of each other allows for some interesting results! 

## Usage

To use the site, simply choose your preferred style of breathing, or set your own! After that just go back to working while this page sits in the background. Once you get back, you'll have to scroll to find your moment of calm....

Spaced Breath - a constant pulse to breathe along to
Held Pause - as the name implies, creates a moment to hold you breath, with a slower intake
Custom Speed - lets the user set their own speed for both pause length and the pulse rate

## Made with [Anime.js](https://animejs.com/)

 Using this library took away a lot of the stange concepts that come with css animations. Although it acheives similar results at surface level, it provides the user with a lot more freedom with the aniamtion and the values that correspond with said animations. It was fast and easy to use once you read a few stack overflow pages on how to use the functions. For some reason, the documentation seems to not cover some of the more complex features. Although they are not nessicary for the average animation, some of them were very useful. One such feature I made use of was assigning an anime.js function to a variable and then deleting the animation with variable.remove(). Other than that, the site is very user friendly and provides visual examples for most of the features that come with the lib! 

