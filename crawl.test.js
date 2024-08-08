import {test, expect} from '@jest/globals'
import {normalizeURL} from './crawl.js'

//normalizeURL Testing
const normalizeURL_testCases = [
    {   input: 'https://blog.boot.dev/path/',
        output: 'blog.boot.dev/path',
        testType: 'trailing slash'
    },
    {   input: 'https://blog.boot.dev/path',
        output: 'blog.boot.dev/path',
        testType: 'no trailing slash'
    },
    {   input: 'http://blog.boot.dev/path',
        output: 'blog.boot.dev/path',
        testType: 'protocol independent'
    },
    {   input: 'http://blog.BoOt.dev/Path',
        output: 'blog.boot.dev/path',
        testType: 'case insensitive'
    }
]

for (const testCase of normalizeURL_testCases) {
    test(`normalizeURL (${testCase.testType})`, () => {
        expect(normalizeURL(testCase.input)).toBe(testCase.output)
    })
}
