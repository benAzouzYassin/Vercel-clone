# Vercel-clone
### A minimalist vercel clone app to deploy projects from github.

# Previews

### Authentication page with github
![](https://raw.githubusercontent.com/benAzouzYassin/Vercel-clone/main/previews/auth-page.png)

### Home page
![](https://github.com/benAzouzYassin/Vercel-clone/Vercel-clone/main/previews/home-page.png)

### Creating new project from github 
![](https://github.com/benAzouzYassin/Vercel-clone/Vercel-clone/main/previews/import-page.png)


### Project deployment page
![](https://github.com/benAzouzYassin/Vercel-clone/Vercel-clone/main/previews/project-page.png)

# Project Folders

## Upload Service
**This service is responsible on uploading the user project in our systems.**

## Build Service
**This service is responsible on building the user project and saving the result of the build in cloud storage bucket firebase in our case .**

## Request Service
**This service is responsible on handling the traffic on a user project (uses the project id to get the build files).**

## Backend
**This is the main backend of our project. It is responsible for the authentication, making calls to other services, getting project status ect..**

## Frontend
**This is the ui of our project.**

# Technologies
### *React / Redis / Postgresql / Prisma ORM / Firebase / Tailwind / Nodejs / Express*