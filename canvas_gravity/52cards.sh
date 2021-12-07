#!/bin/bash

See https://superuser.com/questions/55040/save-a-single-web-page-with-background-images-with-wget


1. whole site
   wget --recursive --no-clobber --page-requisites --html-extension --convert-links --restrict-file-names=windows -e robots=off

2. whole pages
 wget -E -H -k -K -p -e robots=off

http://js.findingsteve.net/DeckOfCards.cshtml 
http://js.findingsteve.net/DeckOfCards.cshtml