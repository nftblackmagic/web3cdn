import { makeStyles } from '@mui/styles';
import { isMobile } from '../utils';

export const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
        }
    }
});

export const titleClass = { width: "100%", padding: "0px" }

export const cardClasses = isMobile() ? { minWidth: 275 } : { minWidth: 475 };
