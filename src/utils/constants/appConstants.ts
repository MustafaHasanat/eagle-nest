interface AppProps {
    version: string;
    description: string;
    commands: {
        [option: string]: {
            flags: string;
            desc: string;
        };
    };
    options: {
        [option: string]: {
            flags: string;
            desc: string;
        };
    };
}

const appConstants: AppProps = {
    version: "1.0.0",
    description: "Build Nest.js common blocks and files insanely faster!",
    commands: {
        init: {
            flags: "init <project-name>",
            desc: "Install 'Nest.js' globally if it is not installed, and create a new project.",
        },
    },
    options: {},
};

export default appConstants;
