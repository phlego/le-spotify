import {ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ArrowUpOnSquareIcon} from '@heroicons/react/24/outline'

interface ImportModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    fileImporter: (file: string) => void
}

function ImportModal({open, setOpen, fileImporter}: ImportModalProps) {

    const cancelButtonRef = useRef(null)
    const [file, setFile] = useState<Blob | null>(null)

    const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    const uploadToServer = async () => {
        const fileAsText = await file?.text() || ''
        fileImporter(fileAsText)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl
                                           transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center
                                                       rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ArrowUpOnSquareIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-lg font-medium leading-6 text-gray-200">
                                                Upload Collection
                                            </Dialog.Title>
                                            <div className="mt-10">
                                                <input
                                                    type="file"
                                                    className="text-gray-200"
                                                    onChange={uploadToClient}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent
                                                   bg-green-600 hover:bg-green-500 px-4 py-2 text-base font-medium text-white
                                                   shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500
                                                   focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            setOpen(false)
                                            uploadToServer()
                                        }}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md px-4 py-2 text-base
                                                   font-medium text-gray-200 shadow-sm focus:outline-none focus:ring-2
                                                   focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ImportModal