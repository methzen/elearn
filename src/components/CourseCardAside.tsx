import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image'

type Props={
    name: string
    id?: string
    imageUrl: string
    description: string
    ownerShipLevel?: number
}

export default function CourseCardAside({name, description, imageUrl}: Props) {
  console.log('imageUrl', imageUrl)
  return (
    <Card sx={{ marginTop: 2}}>
      <CardMedia
        sx={{ height: 180 }}
        title="green iguana"
      >
      <div style={{ position: 'relative', width: '100%', height: '187px' }}>
        <Image src={imageUrl} alt={name} fill />
      </div>
      </CardMedia>
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
