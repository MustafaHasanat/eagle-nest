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
        db: {
            flags: "-db, --database",
            desc: "Made the necessary changes for the database configuration.",
        },
        ct: {
            flags: "-ct, --create-table",
            desc: "Create the necessary files for the table (module, controller, service, dto, entity).",
        },
        cc: {
            flags: "-cc, --create-column",
            desc: "Perform the necessary file changes to add a new column to a table.",
        },
        cr: {
            flags: "-cr, --create-relation",
            desc: "Perform the necessary file changes to establish a relation between two tables.",
        },
    },
};
export default appConstants;
//# sourceMappingURL=appConstants.js.map