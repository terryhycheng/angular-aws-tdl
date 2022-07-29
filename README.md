# 📃 Personal To Do List App

## **Table of Content**

- [📃 Personal To Do List App](#-personal-to-do-list-app)
  - [**Table of Content**](#table-of-content)
  - [**Overview**](#overview)
  - [**📂 Basic Usage**](#-basic-usage)
    - [1. Environment Configuration](#1-environment-configuration)
    - [2. AWS Setup](#2-aws-setup)
    - [3. Config Pipeline](#3-config-pipeline)
    - [4. Deployment](#4-deployment)
  - [**📋 Documentation**](#-documentation)
  - [**⚙️ Build with**](#️-build-with)

---

## **Overview**

🔗Preview URL : [https://angular-aws-tdl.s3.amazonaws.com/index.html](https://angular-aws-tdl.s3.amazonaws.com/index.html)

Personal to-do app is an app with authentication functionality built with JWT. Users can register their own accounts to manage to-dos:

- ✔️ Create a new task with title and text content.
- ✔️ Delete a task
- ✔️ Change task status : Finished/Unfinished

![App preview](docs/assets/app-priview.png)

## **📂 Basic Usage**

This project mainly depends on **AWS S3**, **AWS Lambda function**, **Express JS** and also **Angular framwork**. A customised pipeline with the service provided by **Circle CI**, the project can have a high flexibility on continue integration and development in a long run.

### 1. Environment Configuration

After getting the source code, please replace `*` with your credentials and put into either your local `.env` file or the environment configuration setting on the deployment platform of your choice.

_On Circle CI, you can create your own `Contexts` in Organization Setting._

```sh
AWS_ACCESS_KEY_ID = ********
AWS_DEFAULT_REGION = ********
AWS_SECRET_ACCESS_KEY = ********
DATABASE_URL = ********
SALT_ROUND = ********
TOKEN_SECRET = ********
```

### 2. AWS Setup

Create your own AWS S3 bucket and RDS database, then replace the links in `frontend/src/environments/environment.ts` and also `DATABASE_URL` in your environment setting.

### 3. Config Pipeline

Config your own pipeline by modifying Circle CI [config.yml](.circleci/config.yml).

### 4. Deployment

Run the following command to deploy or push to your version control platform like **GitHub** with your Circle CI which keeps track on your latest version.

```sh
npm run deploy
```

🌟All are set now! Enjoy your own to-do list app.

## **📋 Documentation**

For more details of the app setup, please go to the documentation listed below.

- [Infrastructure Description](docs/Infrastructure_description.md)
- [Pipeline Description](docs/Pipeline_description.md)
- [Application Dependencies](docs/Application_dependencies.md)

## **⚙️ Build with**

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [Serverless](https://www.serverless.com/) - A Deployment Service to AWS Lambda
- [Prisma](https://www.prisma.io/) - An Open Source ORM with Typescript
