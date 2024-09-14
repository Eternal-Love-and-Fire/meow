// components/ui/alert-dialog.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AlertDialogContextProps {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextProps | null>(null);

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within an AlertDialog');
  }
  return context;
}

interface AlertDialogProps {
  children: React.ReactNode;
}

export function AlertDialog({ children }: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <AlertDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </AlertDialogContext.Provider>
  );
}
interface AlertDialogTriggerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any>;
    asChild?: boolean;
  }
  
  export function AlertDialogTrigger({ children, asChild }: AlertDialogTriggerProps) {
    const { openDialog } = useAlertDialogContext();
  
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
      return React.cloneElement(child, {
        onClick: openDialog,
      });
    }
  
    return (
      <button onClick={openDialog}>
        {children}
      </button>
    );
  }
interface AlertDialogContentProps {
  children: React.ReactNode;
}

export function AlertDialogContent({ children }: AlertDialogContentProps) {
  const { isOpen, closeDialog } = useAlertDialogContext();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      dialogRef.current?.focus();

      return () => {
        previouslyFocusedElement?.focus();
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closeDialog();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDialog]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      closeDialog();
    }
  };

  // Focus trap
  const handleTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        e.preventDefault();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={overlayRef}
            onClick={handleOverlayClick}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white dark:bg-black rounded-md p-6 w-full max-w-lg mx-auto focus:outline-none"
              ref={dialogRef}
              tabIndex={-1}
              role="alertdialog"
              aria-modal="true"
              onKeyDown={handleTabKey}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function AlertDialogHeader({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <h2 className={cn('text-lg font-semibold', className)}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <p className={cn('text-sm text-gray-700 dark:text-gray-300', className)}>
      {children}
    </p>
  );
}

export function AlertDialogFooter({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <div className={cn('mt-4 flex justify-end space-x-2', className)}>
      {children}
    </div>
  );
}

export function AlertDialogAction({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { closeDialog } = useAlertDialogContext();
  return (
    <button
      className={cn('px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200', className)}
      onClick={closeDialog}
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { closeDialog } = useAlertDialogContext();
  return (
    <button
      className={cn('px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600', className)}
      onClick={closeDialog}
      {...props}
    >
      {children}
    </button>
  );
}
