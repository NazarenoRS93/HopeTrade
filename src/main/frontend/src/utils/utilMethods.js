import {basepath} from "./utilConstants";

export const changeRoute = (path) => {
    let newPath = basepath+path;
    window.location.href = newPath;
}