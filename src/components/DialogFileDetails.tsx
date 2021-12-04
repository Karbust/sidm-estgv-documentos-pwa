import { FunctionComponent, SetStateAction } from 'react'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { FullMetadata } from 'firebase/storage'
import { format } from 'date-fns'

import { humanFileSize } from '../functions'

interface Props {
    value: FullMetadata
    open: boolean
    setOpen: (value: SetStateAction<boolean>) => void
}
const DialogFileDetails: FunctionComponent<Props> = ({ value, open, setOpen }) => {
    const handleClose = () => setOpen(false)

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>File Details</DialogTitle>
            <DialogContent>
                <Typography>
                    <b>Name:</b>
                    {' '}
                    {value.name}
                </Typography>
                <Typography>
                    <b>Size:</b>
                    {' '}
                    {humanFileSize(value.size, true)}
                </Typography>
                <Typography>
                    <b>Created At:</b>
                    {' '}
                    {format(new Date(value.timeCreated), 'dd-MM-yyyy HH:mm:ss')}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}
export default DialogFileDetails
