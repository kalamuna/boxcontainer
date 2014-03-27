#!/bin/bash

which brew ||
  ruby -e "`curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install`"

which vboxmanager ||
  brew cask install virtualbox

which vagrant ||
  brew cask install vagrant
