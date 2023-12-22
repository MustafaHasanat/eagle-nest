import {
    installInitCloning,
    installInitInjection,
} from "../../commands/installAction/initialPack.js";
import manipulator from "../../manipulator/index.js";

export default async function installInitBuilder() {
    manipulator({
        cloningCommands: installInitCloning(),
        injectionCommands: installInitInjection(),
    });
}
