import React from "react";
import AppName from '../AppName.png';
import Dialog from "@mui/material/Dialog";
import {Link} from "react-router-dom";
import {defaultDialogData} from "../utils/utilConstants";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

function CustomDialog(props) {
    const {
        data, setData
    } = props;

    return (
        <React.Fragment>
            <Dialog
                open={data.open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
                maxWidth={'sm'}
            >
                <DialogTitle>
                    <img src={AppName} width="30%" />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{data.msg}</Typography>
                </DialogContent>
                <DialogActions>
                    <Link to={data.path}>
                        <Button size="small" variant="contained" color="success" onClick={setData(defaultDialogData)}>
                            <Typography variant="button">Continuar</Typography>
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default CustomDialog;