import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import pathCreator from "../utils/helpers/pathCreator.js";
import NameVariant from "./nameVariant.js";

interface NewPathProps {
    mainDir: string;
    nameVariant: NameVariant;
}

class SubPath {
    constructor({ mainDir, nameVariant }: NewPathProps) {
        const { entitiesPath, schemasPath, dtoPath, enumsPath } = this.getPaths(
            { mainDir, nameVariant }
        );

        this.mainPath = mainDir;
        this.enumsPath = enumsPath;
        this.entitiesPath = entitiesPath;
        this.schemasPath = schemasPath;
        this.dtoPath = dtoPath;
    }
    mainPath = "";
    enumsPath = "";
    entitiesPath = "";
    schemasPath = "";
    dtoPath = "";

    private getPaths = ({ mainDir, nameVariant }: NewPathProps) => {
        const { pluralLowerCaseName } = nameVariant;

        // get the paths
        const [entitiesPath, enumsPath, schemasPath, dtoPath] = [
            pathConvertor(mainDir, "entities"),
            pathConvertor(mainDir, `enums`),
            pathConvertor(mainDir, `schemas/${pluralLowerCaseName}`),
            pathConvertor(mainDir, `dto/${pluralLowerCaseName}`),
        ];

        // create the paths if they don't exist
        pathCreator([entitiesPath, schemasPath, dtoPath, enumsPath]);

        return { entitiesPath, schemasPath, dtoPath, enumsPath };
    };
}

export default SubPath;
