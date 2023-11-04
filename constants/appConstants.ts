const appConstants = {
    version: "1.0.0",
    description: "Build Nest.js common blocks and files insanely faster!",
    options: {
        cm: {
            flags: "-cm, --create-main",
            desc: "Create the main.ts file with Swagger enabled.",
        },
        clp: {
            flags: "-clp, --create-landing-page",
            desc: "Create the HTML and CSS files of the landing page for the root dir.",
        },
        caf: {
            flags: "-caf, --create-app-files",
            desc: "Create the 'app.module.ts', 'app.controller.ts', and 'app.service.ts' files.",
        },
    },
};

export default appConstants;
