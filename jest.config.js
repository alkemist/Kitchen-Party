const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts|js)'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/kitchen-party',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/',
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@components/(.*)': '<rootDir>/src/app/components/$1',
        '@converters/(.*)': '<rootDir>/src/app/converters/$1',
        '@enums/(.*)': '<rootDir>/src/app/enums/$1',
        '@errors/(.*)': '<rootDir>/src/app/models/$1',
        '@guards/(.*)': '<rootDir>/src/app/guards/$1',
        '@handlers/(.*)': '<rootDir>/src/app/handlers/$1',
        '@interfaces/(.*)': '<rootDir>/src/app/models/$1',
        '@models/(.*)': '<rootDir>/src/app/models/$1',
        '@modules/(.*)': '<rootDir>/src/app/modules/$1',
        '@resolvers/(.*)': '<rootDir>/src/app/resolvers/$1',
        '@services/(.*)': '<rootDir>/src/app/services/$1',
        '@stores/(.*)': '<rootDir>/src/app/stores/$1',
        '@tools/(.*)': '<rootDir>/src/app/tools/$1',
        '@validators/(.*)': '<rootDir>/src/app/tools/$1',
        '@assets/(.*)': '<rootDir>/src/assets/$1',
        '@env': '<rootDir>/src/environments/environment',
    }),
    transform: {'^.+.(ts|mjs|js|html)$': 'jest-preset-angular'},
    transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};