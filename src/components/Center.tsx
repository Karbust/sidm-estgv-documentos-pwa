import { FunctionComponent, ReactNode } from 'react'
import Box from '@mui/system/Box'

interface Props {
    component: (props: any) => JSX.Element
    children?: ReactNode
    loading?: boolean
}

const Center: FunctionComponent<Props> = ({ component: Component, children, loading, ...rest }) => (
    <Box className='outer' style={{ position: loading ? 'absolute' : 'inherit' }}>
        <Box className='middle'>
            <Box className='inner'>
                <Component {...rest}>{children}</Component>
            </Box>
        </Box>
    </Box>
)
Center.defaultProps = {
    loading: false
}
export default Center
