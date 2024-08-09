import { test, expect } from '@jest/globals'
import { normalizeURL, getURLsFromHTML } from './crawl.js'

//normalizeURL Testing
const normalizeURL_testCases = [
    {
        input: 'https://blog.boot.dev/path/',
        output: 'https://blog.boot.dev/path',
        testType: 'trailing slash'
    },
    {
        input: 'https://blog.boot.dev/path',
        output: 'https://blog.boot.dev/path',
        testType: 'no trailing slash'
    },
    {
        input: 'http://blog.boot.dev/path',
        output: 'https://blog.boot.dev/path',
        testType: 'protocol independent'
    }
]

for (const testCase of normalizeURL_testCases) {
    test(`normalizeURL (${testCase.testType})`, () => {
        expect(normalizeURL(testCase.input)).toBe(testCase.output)
    })
}
//getURLsFromHTML Testing
const getURLsFromHTML_testCases = [
    {
        input: {
            htmlBody: '<p>This is a paragraph without any links.</p>',
            baseUrl: 'https://blog.boot.dev'
        },
        output: [],
        testType: 'no urls'
    },
    {
        input: {
            htmlBody: '<p>This is a paragraph with an absolute link: <a href="https://example.com">Example</a>.</p>',
            baseUrl: 'https://blog.boot.dev'
        },
        output: ['https://example.com'],
        testType: 'one absolute url'
    },
    {
        input: {
            htmlBody: `<p>This is a paragraph with two absolute links: 
                        <a href="https://example.com">Example</a> and 
                        <a href="https://anotherexample.com">Another Example</a>.
                       </p>`,
            baseUrl: 'https://blog.boot.dev'
        },
        output: ['https://example.com', 'https://anotherexample.com'],
        testType: 'multiple absolute urls'
    },
    {
        input: {
            htmlBody: '<p>This is a paragraph with a relative link: <a href="/relative-path">Relative Link</a>.</p>',
            baseUrl: 'https://blog.boot.dev'
        },
        output: ['https://blog.boot.dev/relative-path'],
        testType: 'one relative url'
    },
    {
        input: {
            htmlBody: `<p>This is a paragraph with two relative links: 
                        <a href="/relative-path-1">Relative Link 1</a> and 
                        <a href="/relative-path-2">Relative Link 2</a>.
                        </p>`,
            baseUrl: 'https://blog.boot.dev'
        },
        output: ['https://blog.boot.dev/relative-path-1', 'https://blog.boot.dev/relative-path-2'],
        testType: 'multiple relative url'
    },
    {
        input: {
            htmlBody: `<p>This is a paragraph with a relative link: 
                        <a href="/relative-path">Relative Link</a> and an absolute link: 
                        <a href="https://example.com">Absolute Link</a>.
                        </p>`,
            baseUrl: 'https://blog.boot.dev'
        },
        output: ['https://blog.boot.dev/relative-path', 'https://example.com'],
        testType: 'multiple absolute and relative urls'
    }, 
]

for (const testCase of getURLsFromHTML_testCases) {
    test(`getURLsFromHTML: (${testCase.testType})`, () => {
        expect(getURLsFromHTML(testCase.input.htmlBody, testCase.input.baseUrl))
            .toEqual(testCase.output)
    })
}
