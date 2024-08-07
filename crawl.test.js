import {test, expect} from '@jest/globals'
import {normalizeURL} from './crawl.js'

const expectedURL = 'blog.boot.dev/path'

const normalizeURL_testCases = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path',
    'http://blog.BoOt.dev/Path'
]

for (const url of normalizeURL_testCases) {
    test(`normalizeURL (${url})`, () => {
        expect(normalizeURL(url)).toBe(expectedURL)
    })
}
