export const defaultMainDirectory = "src";

export const defaultLayers: Layer[] = ["factory", "repository", "service"];

export const basePath = process.env.NODE_ENV === "dev" ? "" : process.cwd();
