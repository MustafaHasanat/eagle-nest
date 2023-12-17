type OptionType = {
    flags: string;
    description: string;
};

type CommandType = {
    command: string;
    description: string;
};

type CreateCommandType = CommandType & {
    argument: string;
    options: {
        special: OptionType;
    };
};

type AppProps = {
    program: {
        name: string;
        description: string;
        version: {
            number: string;
            flags: string;
            description: string;
        };
    };
    commands: {
        install: CommandType;
        create: CreateCommandType;
    };
    options?: {
        [option: string]: OptionType;
    };
};

const appConstants: AppProps = {
    program: {
        name: "eaglenest",
        description: "Build Nest.js common blocks and files insanely faster!",
        version: {
            number: "1.0.0",
            flags: "-v, --version",
            description: "Output the current version number",
        },
    },
    commands: {
        install: {
            command: "install",
            description:
                "Install the recommended dependencies if they're not installed.",
        },
        create: {
            command: "create",
            description:
                "Create the necessary files and directories for the selected 'files-set'.",
            argument: "<files-set>",
            options: {
                special: {
                    flags: "--special <table-name>",
                    description: "Create a special type of tables.",
                },
            },
        },
    },
};

export default appConstants;
