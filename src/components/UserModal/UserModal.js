import React from 'react';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { UserSection } from "./UserSection";
import { useDispatch, useSelector } from 'react-redux';
import { closeUserModal } from './UserModalSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const theme = createTheme({
    components: {
        // Name of the component
        MuiDialog: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    left: 'auto !important',
                    bottom: 'auto !important',
                },
            },
        },
    },
});


export const UserModal = () => {
    const userModalOpen = useSelector(state => state.userModal.userModalOpen);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeUserModal());
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={userModalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            borderRadius: 10,
                            fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                            left: "auto !important",
                            bottom: "auto !important",
                        }
                    }}
                >
                    <DialogContent>
                        <UserSection />
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </>
    )
}