import { Argument, Command, Option, OptionValues } from "commander";
import constants from "../utils/constants/appConstants.js";
import createAction from "../actions/createAction.js";
import { isNodeProject } from "../middlewares/isNodeProject.js";
import defaultAction from "../actions/defaultAction.js";
import installAction from "../actions/installAction.js";
import {
    CreateFieldsetArgument,
    CreateSpecialArgument,
} from "../enums/createArguments.js";

const {
    program: {
        name: programName,
        description: programDescription,
        version: {
            number: versionNumber,
            flags: versionFlags,
            description: versionDescription,
        },
    },
    commands: {
        install: {
            command: installCommand,
            description: installDescription,
        },
        create: {
            command: createCommand,
            description: createDescription,
            argument: createArgument,
            options: {
                special: {
                    flags: createFlagsSpecial,
                    description: createDescriptionSpecial,
                },
            },
        },
    },
} = constants;

export default function InitAction(program: Command) {
    const options = program.opts();

    program
        .name(programName)
        .version(versionNumber, versionFlags, versionDescription)
        .description(programDescription);

    program
        .command(installCommand)
        .description(installDescription)
        .action(async () => {
            await installAction();
        });

    program
        .command(createCommand)
        .description(createDescription)
        .addArgument(
            new Argument(createArgument).choices(
                Object.values(CreateFieldsetArgument)
            )
        )
        .addOption(
            new Option(createFlagsSpecial, createDescriptionSpecial).choices(
                Object.values(CreateSpecialArgument)
            )
        )
        .action(
            async (filesSet: CreateFieldsetArgument, options: OptionValues) => {
                isNodeProject();
                await createAction(filesSet, options);
            }
        );

    program.action(() => {
        defaultAction(program, options);
    });

    program.parse(process.argv);
}
