import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';

export type Circle = {
  name: string;
  imageUrl: string;
  description: string;
  groupUrl: string;
  role: string;
  urlName: string;
};

interface courseCardProps {
  circle : Circle;
  myProfile?: boolean;
}
export default function CourseCard({ circle, myProfile}: courseCardProps) {
  const {name, urlName, imageUrl, description, role, groupUrl} = circle
  const { push } = useRouter();

  const getInsideGroup = () => {
    if(!myProfile){
      push(groupUrl);
    }else{
      push(`/dashboard/${urlName}/community`);
    }
  };

  return (
    <Card sx={{ maxWidth: 350, maxHeight: 426, cursor: 'pointer' }} onClick={getInsideGroup}>
      <CardMedia sx={{ height: 187 }} title="green iguana">
        <div style={{ position: 'relative', width: '100%', height: '187px' }}>
          <Image src={imageUrl} alt={name} fill />
        </div>
      </CardMedia>
      <CardContent sx={{ height: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: '#BFBFBF', fontSize: 14, marginRight: 15 }}> {role}</span>
      </CardActions>
    </Card>
  );
}
