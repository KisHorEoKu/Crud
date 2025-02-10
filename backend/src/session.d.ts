import * as express from 'express';

declare module 'express' {
    interface SessionData {
        user: String;
    }
}