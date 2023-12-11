interface AppProps {
    version: string;
    description: string;
    commands: {
        [command: string]: {
            action: string;
            description: string;
        };
    };
    options: {
        [option: string]: {
            flags: string;
            description: string;
        };
    };
}

const appConstants: AppProps = {
    version: "1.0.0",
    description: "Build Nest.js common blocks and files insanely faster!",
    commands: {
        install: {
            action: "install",
            description:
                "Install the recommended dependencies if they're not installed.",
        },
        create: {
            action: "create <files-set>",
            description:
                "Create the necessary files and directories for the selected 'files-set'.",
        },
    },
    options: {},
};

export default appConstants;
