import {
    ChangeEvent, FunctionComponent, useContext, useRef, useState
} from 'react'
import clsx from 'clsx'
import Box from '@mui/system/Box'
import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import AttachFile from '@mui/icons-material/AttachFile'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ref, uploadString } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { Context } from '../reducer/Store'
import { getCurrentFolder } from '../functions'
import { auth, db, storage } from '../firebase/config'

const BoxStyled = styled(Box)`
  transform: translate(0%, 0%);
  background-color: #1f1c1f;
  color: white !important;
  border: none;
  position: fixed;
  width: 100%;
  height: fit-content;
  bottom: 0;
  left: 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
`

const convertFileToBase64 = (file: File): Promise<{fileName: string, base64: string | ArrayBuffer | null}> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve({
        fileName: file.name,
        base64: reader.result
    })
    reader.onerror = reject
})

const invisibleField: any = {
    display: 'none',
    visibility: 'hidden',
}

const visibleField: any = {
    display: 'inherit',
    visibility: 'visible',
}

interface PropsTextFieldFolder {
    status: number
}

const TextFieldFolder = styled(TextField)<PropsTextFieldFolder>`
  display: ${(props) => (props.status === 0 && 'none')} !important;
  visibility: ${(props) => (props.status === 0 && 'hidden')} !important;
`

interface Props {
    open: boolean
    handleClose: () => void
}

const DialogUpload: FunctionComponent<Props> = ({ open, handleClose }) => {
    // @ts-ignore
    const { dispatch, state } = useContext(Context)

    const [folder, setFolder] = useState<string>('')
    const [choice, setChoice] = useState<number>(0)
    const fileUploadInput = useRef(null)

    const fileUploadInputClick = () => {
        if (fileUploadInput.current) {
            (fileUploadInput.current as HTMLInputElement).click()
        }
    }

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const escolha = Number((event.target as HTMLInputElement).value)
        if (escolha === 0) {
            setFolder('')
        }
        setChoice(escolha)
    }

    console.log({ choice, bool: choice !== 1 })
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const path = getCurrentFolder()
        const folderNew = folder !== '' ? `${folder}/` : ''

        if (event.target.files) {
            convertFileToBase64(event.target.files[0])
                .then(async (data) => {
                    const storageRef = ref(storage, `uploads/${auth.currentUser?.uid}/${path}/${folderNew}${data.fileName}`)
                    if (typeof data.base64 === 'string') {
                        try {
                            const upload = await uploadString(storageRef, data.base64, 'data_url')
                            console.log(upload)
                            handleClose()
                            dispatch({
                                type: 'SET_UPDATE',
                                payload: state.update + 1
                            })

                            const docRef = await addDoc(collection(db, 'documents'), {
                                fileName: upload.metadata.name,
                                size: upload.metadata.size,
                                extension: upload.metadata.name.split('.').pop(),
                                timeCreated: upload.metadata.timeCreated,
                                owner: auth.currentUser?.uid,
                            })
                            console.log('Document written with ID: ', docRef.id)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
                .catch(console.error)
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <BoxStyled>
                <Typography id='modal-modal-title' variant='h6' style={{ marginTop: '1em', marginBottom: '1em', fontFamily: 'Poppins', fontSize: '1em' }}>
                    Create New
                </Typography>
                <input
                    ref={fileUploadInput}
                    onChange={handleFileUpload}
                    type='file'
                    style={{ display: 'none', marginRight: '16px' }}
                    multiple={false}
                />
                <FormControl
                    sx={{ marginBottom: 3 }}
                    variant='standard'
                >
                    <FormLabel component='legend'>Where to upload?</FormLabel>
                    <RadioGroup
                        row
                        aria-label='quiz'
                        name='quiz'
                        value={choice}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value={0} control={<Radio />} label='Current Folder' />
                        <FormControlLabel value={1} control={<Radio />} label='New Folder' />
                    </RadioGroup>
                    <TextFieldFolder
                        status={choice}
                        label='Folder Name'
                        value={folder}
                        disabled={choice !== 1}
                        onChange={(event) => setFolder(event.target.value)}
                    />
                </FormControl>
                <div className='btn-group col-12' style={{ marginBottom: '16px' }} role='group' aria-label='Basic example'>
                    <button className='btn btn-primary btn-lg secondaryButton' type='button' onClick={fileUploadInputClick}>
                        <AttachFile />
                        Ficheiro
                    </button>
                    <button className='btn btn-primary btn-lg primaryButton2' type='button'>
                        <FileUploadIcon />
                        Upload
                    </button>
                </div>
            </BoxStyled>
        </Modal>
    )
}
export default DialogUpload
