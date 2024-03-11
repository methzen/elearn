import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Chip,
  Stack,
  Avatar,
  TextField,
  Typography,
  StackProps,
  Autocomplete,
  Button,
} from '@mui/material';
// @types
import { IChatParticipant } from '../../../@types/chat';
// components
import Iconify from '../../../components/iconify';
import SearchNotFound from '../../../components/search-not-found';
import { searchParticipant } from 'src/api/search';
import useResponsive from 'src/hooks/useResponsive';
import createConversation from 'src/api/createConversation';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  contacts: IChatParticipant[];
  recipients: IChatParticipant[];
  onAddRecipients: (data: IChatParticipant[]) => void;
}

export default function ChatHeaderCompose({
  contacts,
  recipients,
  onAddRecipients,
  sx,
  ...other
}: Props) {
  const { push } = useRouter()
  const [searchRecipients, setSearchRecipients] = useState('');
  const [currentContacts, setCurrentContacts] = useState<IChatParticipant[]>([])
  const isDesktop = useResponsive('up', 'sm');

  const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
    setSearchRecipients('');
    onAddRecipients(selectedRecipients);
  };

  const handleCreateConversation = async () => {
    try{
      const response = await createConversation({
        with : recipients.map(r=> r._id)
      });
      if (!response) {
        return console.error('Could not create conversation');
      }
      push(PATH_DASHBOARD.chat.view(response._id))
    }catch(error){
      console.error(error)
    }
  }

  const handleSearchParticipant = (query: string) =>{
    setSearchRecipients(query)

    if (query && query.length >= 2) {
      setCurrentContacts([])
      let launchRequest = setTimeout(() => {
        searchParticipant(query).then(
          response => {
            // const total = [...currentContacts, ...response.data]
            // setCurrentContacts([...new Set(total)])
            setCurrentContacts(response.data)}
        ).catch(
          error => {
            console.log('Error', error.message)
            // setSearchResults([]);
          }
        );
      }, 500)
      return () => clearTimeout(launchRequest);
    }
  }

  return (
    <Stack
      spacing={2}
      direction={isDesktop ? "row" : "column"}
      alignItems="center"
      sx={{
        py: 2,
        px: 2.5,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Create a conversation with:
      </Typography>

      <Autocomplete
        sx={{ minWidth: isDesktop? 540 : "100%" }}
        multiple
        popupIcon={null}
        noOptionsText={<SearchNotFound query={searchRecipients} lengthCondition={2}/>}
        onChange={(event, value) => handleAddRecipients(value)}
        onInputChange={(event, value) => handleSearchParticipant(value)}
        options={[...contacts, ...currentContacts]}
        getOptionLabel={(recipient) => `${recipient.firstname} ${recipient.lastname}`}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder={recipients.length ? '+Recipients' : ''}
          />
        )}
        renderOption={(props, recipient, { inputValue, selected }) => {
          const { firstname, lastname,  photoURL } = recipient;
          console.log('inputValue', inputValue)
          const name = `${firstname+" "+lastname}`
          const matches = match(name, inputValue);
          // const parts = parse(name, matches);

          const firstnameParts = parse(`${firstname}`, match(firstname, inputValue));
          const lastnameParts = parse(lastname, match(lastname, inputValue));
          console.log('parts', firstnameParts, lastnameParts)
          const parts = [...firstnameParts]
          return (
            <Box
              component="li"
              sx={{
                p: '12px !important',
              }}
              {...props}
            >
              <Box
                sx={{
                  mr: 1.5,
                  width: 32,
                  height: 32,
                  overflow: 'hidden',
                  borderRadius: '50%',
                  position: 'relative',
                }}
              >
                <Avatar alt={firstname} src={photoURL} />
                <Box
                  sx={{
                    top: 0,
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(selected && {
                      opacity: 1,
                      color: 'primary.main',
                    }),
                  }}
                >
                  <Iconify icon="eva:checkmark-fill" />
                </Box>
              </Box>
              
              {firstnameParts.map((part, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}

              {/* {lastnameParts.map((part, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))} */}
            </Box>
          );
        }}
        renderTags={(selectedRecipients, getTagProps) =>
          selectedRecipients.map((recipient, index) => (
            <Chip
              {...getTagProps({ index })}
              key={recipient._id}
              size="small"
              label={recipient.firstname + " " + recipient.lastname}
              avatar={<Avatar alt={recipient.firstname} src={recipient.photoURL} />}
            />
          ))
        }
      />
      <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="eva:edit-fill" />}
          onClick={handleCreateConversation}
          sx={{
            width: 120,
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          create
      </Button>
    </Stack>
  );
}
