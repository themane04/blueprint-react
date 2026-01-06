/**
 * Environment configuration file that dynamically selects between
 * development and production settings based on the build environment.
 */
import { environment as dev } from './environment.dev';
import { environment as prod } from './environment.prod';

const isProd = import.meta.env.PROD;

export const environment = isProd ? prod : dev;
