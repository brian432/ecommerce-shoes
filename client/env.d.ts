declare namespace NodeJS {
    export interface ProcessEnv {
        [key: string]: string;
    }
}

declare const process: {
    env: NodeJS.ProcessEnv;
};