#!/bin/sh

echo "Start Updating Posts"
rm -rf posts/*
cp -r /i/Obsidian/NolaBlogTest/NolaBlog/* posts/
echo "Posts Updated"
