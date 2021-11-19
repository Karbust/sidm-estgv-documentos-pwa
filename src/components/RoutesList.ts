import { FunctionComponent, lazy } from 'react'

const Files = lazy(() => import('./pages/Files'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Menu = lazy(() => import('./pages/Menu'))

const RoutesList: Array<{ url: string, component: FunctionComponent }> = [{
    url: '/Files',
    component: Files
}, {
    url: '/Statistics',
    component: Statistics
}, {
    url: '/Menu',
    component: Menu
}]
export default RoutesList
