import { FunctionComponent, lazy } from 'react'

const Files = lazy(() => import('./pages/Files'))
const Statistics = lazy(() => import('./pages/Statistics'))

const RoutesList: Array<{ url: string; component: FunctionComponent }> = [{
    url: '/Files',
    component: Files,
},
{
    url: '/Statistics',
    component: Statistics,
}]
export default RoutesList
