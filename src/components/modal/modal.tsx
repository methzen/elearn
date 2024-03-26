import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ProfileComponent from 'src/sections/account/ProfileComponent';
import { ProfileData } from 'src/@types/user';
import { getUserProfileData } from 'src/api/getUserData';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minHeight: "80vh"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogCommands {
  open: boolean;
  handleClose: () => void;
  userId: string
}
export default function UserProfileModal({ open, handleClose, userId }: DialogCommands) {
  const [data, setData] = React.useState<ProfileData>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")

  React.useEffect(() => {
    const getUserData = async () => {
     setIsLoading(true)
     try{
      const data = await getUserProfileData(`/users/profile/data?id=${userId}`)
      setData(data)
      setIsLoading(false)
     }catch(e){
      setError("Couldn't show user information...")
      setIsLoading(false)
     }
    }
    if(open && userId){
      getUserData()
    }
  }, [open, userId])

  const renderComponent =(data: ProfileData, isLoading: boolean, error: string)=>{
    if(isLoading){
      return <>Loading....</>
    }
    if(error){
      return <>{error}</>
    }
    return <ProfileComponent data={data} myProfile={false} mutate={()=>{}}/>
  }
  return (
    <div>
      <BootstrapDialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'lg'}
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        {renderComponent(data as ProfileData, isLoading, error)}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


// export default function CustomizedDialogs({ open, handleClose }: DialogCommands) {
//   return (
//     <div>
//       <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Modal title
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
//             in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
//             lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
//             scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
//             auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }
