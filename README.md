# Eagle Nest

Build Nest.js common blocks and files insanely faster!

## Ho does it work?

### General working principle

We use pre-built (.txt) templates and components to be copied from our library, get some modifications based on your answers to the CLI prompt, and finally pasted as (.ts) files into your project

### Cloning and Injection

We have 2 processes to complete the previously mentioned action, cloning and injection. The tool clones the (.txt) files and replaces the placeholders with the given processed answers before the're placed in the given location. Then it injects some blocks of code in different files so you don't need to modify **ANYTHING**.

## Before starting

### Comments

You'll notice some comments in the generated files. We use those to locate the place in the code where the new blocks should be injected. Therefore, you can **only remove** them after you finish using the tool to build the blocks.

### Placeholders

You might also notice some placeholder variables or values written in an uppercase format (e.g: `FIELD_NAME`). TypeScript will notify you about them (since they're not defined). You can change those whenever you want since their purpose is just to let you know about the options without causing runtime errors.

## Getting started

-   Install **nest-cli** globally:  
     `npm install -g @nestjs/cli`

-   Create a new project:  
     `nest new project-name`  
     `cd project-name`

-   Install **eaglenest** globally:  
     `npm install -g @mustafa-alhasanat/eagle-nest`

-   Install the recommended dependencies:  
     `eaglenest install`

> Now you're ready to go!

# Commands

## The `install` command

Install the recommended dependencies in your project if they're not yet installed. These are different from the ones installed using `nest new` command by default.

### The list of dependencies:

```
"@nestjs/config"
"@nestjs/typeorm"
"@nestjs/platform-express"
"@nestjs/serve-static"
"@nestjs/swagger"
"class-validator"
"class-transformer"
"express-session"
"typeorm"
"mysql2 "
"pg"
"uuid"
"bcrypt"
"fs"
```

### The list of dev-dependencies:

```
"@types/multer"
"@types/bcrypt"
```

## The `create` command

Create the necessary files and directories for the selected 'files-set'.

> Usage: `eaglenest create <files-set>`

| Files Set    | Description                                                                          |
| :----------- | :----------------------------------------------------------------------------------- |
| main         | Create the main.ts file with Swagger enabled.                                        |
| landing-page | Create the HTML and CSS files of the landing page for the root dir.                  |
| app          | Create the 'app.module.ts', 'app.controller.ts', and 'app.service.ts' files.         |
| database     | Made the necessary changes for the database configuration.                           |
| table        | Create the necessary files for the table (module, controller, service, dto, entity). |
| column       | Perform the necessary file changes to add a new column to a table.                   |
| relation     | Perform the necessary file changes to establish a relation between two tables.       |

# Specifications

### Directories

-   The main file is supposed to be located at the root `./main.ts`
-   The default used app directory is `./src/`
-   Inside the app directory, we have organized and grouped directories for each section:
    -   schemas
    -   dto
    -   enums
    -   entities
    -   decorators

### Naming

-   The naming convention for all generated files is as follow:  
     `[name].[type].ts`
-   Examples:
    -   `app.module.ts`
    -   `users.controller.ts`
    -   `user-role.enum.ts`
    -   `user.validator.ts`
    -   `create-user.dto.ts`

# Limitations

### Language

Currently, the tool only generate codes in **TypeScript**

### Database

Currently, the only available database is **PostgreSQL**

# Future Updates

-   **MongoDB** will be available to use
