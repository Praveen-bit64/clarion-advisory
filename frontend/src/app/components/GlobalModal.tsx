'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useEffect } from 'react';

interface GlobalModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    initialFocus?: React.MutableRefObject<HTMLElement | null>;
    closeOnOverlayClick?: boolean;
    className?: string;
    modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    overlayClassName?: string;
}

export default function GlobalModal({
    isOpen,
    onClose,
    children,
    initialFocus,
    closeOnOverlayClick = true,
    className = '',
    modalSize = 'lg',
    overlayClassName = ''
}: GlobalModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Modal size classes
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full'
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[9999]"
                onClose={closeOnOverlayClick ? onClose : () => { }}
                initialFocus={initialFocus}
            >
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm ${overlayClassName}`} />
                </Transition.Child>

                {/* Modal wrapper */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`
                                    w-full transform overflow-hidden rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all
                                    ${sizeClasses[modalSize]}
                                    ${className}
                                `}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}