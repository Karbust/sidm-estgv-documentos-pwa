/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { ExpirationPlugin } from 'workbox-expiration'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'

declare const self: Window & ServiceWorkerGlobalScope

clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler, {
    denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
})
registerRoute(navigationRoute)

registerRoute(
    /\.(?:webp|png|jpg|jpeg)$/,
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
                purgeOnQuotaError: true,
            }),
        ],
    })
)
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
                purgeOnQuotaError: true,
            }),
        ],
    }),
)
registerRoute(
    ({ request }) => request.destination === 'script' ||
        request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
)
registerRoute(
    /\.(?:eot|svg|ttf|woff|woff2)$/,
    new CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                purgeOnQuotaError: true,
            }),
        ],
    })
)

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting()
    }
})
