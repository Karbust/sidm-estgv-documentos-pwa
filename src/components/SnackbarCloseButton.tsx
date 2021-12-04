import { FunctionComponent } from 'react'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { SnackbarKey, useSnackbar } from 'notistack'

interface Props {
    key: SnackbarKey
}
const SnackbarCloseButton: FunctionComponent<Props> = ({ key }) => {
    const { closeSnackbar } = useSnackbar()
    return (
        <IconButton
            color='inherit'
            size='small'
            onClick={() => closeSnackbar(key)}
        >
            <CancelIcon />
        </IconButton>
    )
}
export default SnackbarCloseButton
