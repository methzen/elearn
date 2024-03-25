// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../../components/image';
import SvgColor from '../../components/svg-color';
import { GroupAboutProps } from 'src/auth/CircleGuard';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SellIcon from '@mui/icons-material/Sell';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  group: GroupAboutProps;
};

export default function AboutCard({ group }: Props) {
  const { name, imageUrl, description, author, members, contributions, isPaying, isPrivate } =
    group;

  const _socials = !author.socialLinks
    ? []
    : [
        {
          value: 'facebookLink',
          name: 'FaceBook',
          icon: <FacebookIcon />,
          color: '#1877F2',
          path: author.socialLinks.facebookLink,
        },
        {
          value: 'instagramLink',
          name: 'Instagram',
          icon: <InstagramIcon />,
          color: '#E02D69',
          path: author.socialLinks.instagramLink,
        },
        {
          value: 'linkedinLink',
          name: 'Linkedin',
          icon: <LinkedInIcon />,
          color: '#007EBB',
          path: author.socialLinks.linkedinLink,
        },
        {
          value: 'twitterLink',
          name: 'Twitter',
          icon: <TwitterIcon />,
          color: '#00AAEC',
          path: author.socialLinks.twitterLink,
        },
        {
          value: 'youtubeLink',
          name: 'Youtube',
          icon: <YouTubeIcon />,
          color: '#f00',
          path: author.socialLinks.youtubeLink,
        },
      ];

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt={author.name}
          src={author.imageUrl as string}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <StyledOverlay />

        <Image src={imageUrl as string} alt="cover" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        By {author.name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {author.role}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
        {_socials.map((social) =>
          social.path ? (
            <IconButton
              href={social.path}
              target="_blank"
              rel="noreferrer"
              key={social.name}
              sx={{
                color: social.color,
                '&:hover': {
                  bgcolor: alpha(social.color, 0.08),
                },
              }}
            >
              {social.icon}
            </IconButton>
          ) : null
        )}
      </Stack>

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5" component="div" align="left">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="justify">
          {description}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Total members
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(members.total)}</Typography>
        </div>

        <div>
          {contributions ? (
            <>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.75, color: 'text.disabled' }}
              >
                Contributions
              </Typography>
              <Typography variant="subtitle1">{fShortenNumber(contributions)}</Typography>
            </>
          ) : null}
        </div>
        <div>
          {isPaying ? (
            <>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.75, color: 'text.disabled' }}
              >
                membership
              </Typography>
              <SellIcon />
            </>
          ) : isPrivate ? (
            <>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.75, color: 'text.disabled' }}
              >
                Private group
              </Typography>
              <LockIcon />
            </>
          ) : (
            <>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.75, color: 'text.disabled' }}
              >
                Free group
              </Typography>
              <LockOpenIcon />
            </>
          )}
        </div>
      </Box>
    </Card>
  );
}
