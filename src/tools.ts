import {IncomingMessage} from "http";
import {colors} from "./constants.js";
import * as fs from "fs";

export const sayHi = (name:string):void => {
    console.log(`Hello ${name}`);
}

export async function parsBody(req: InstanceType<typeof IncomingMessage>) {

    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body))
            } catch (e) {
                reject(new Error('Invalid json'))
            }
        })
    })
}

export const getDateTime = () => {
    return new Date().toISOString();
};

export const getColoredDateTime = () => {
    return colors.FgGreen + getDateTime() + colors.Reset;
};

export const saveToFile = (message: string, fileName: string = "./user-server.log") => {
    fs.appendFile(fileName, message + "\n", (err) => {
        if (err) {
            console.log(err);
            throw new Error(err.toString());
        }
    });
}