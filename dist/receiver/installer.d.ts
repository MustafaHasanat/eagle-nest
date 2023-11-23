type PackageType = {
    packageName: string;
    commandType: "--save" | "--save-dev";
};
export declare class Installer {
    constructor();
    dependencies: string[];
    private getUninstalledPackages;
    installPackages: (packages: PackageType[]) => Promise<void>;
}
export {};
