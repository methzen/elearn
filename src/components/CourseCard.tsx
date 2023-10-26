import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image'

type Course={
    name: string
    id: string
    imageUrl: string
    description: string
}

export default function CourseCard({id, name, imageUrl, description}: Course) {

  return (
    <Card sx={{ maxWidth: 350, maxHeight:426 }}>
      <CardMedia
        sx={{ height: 187 }}
        title="green iguana"
      >
      <div style={{ position: 'relative', width: '100%', height: '187px' }}>
            <Image src={imageUrl} alt={name} fill />
      </div>
      </CardMedia>
      <CardContent sx={{ height:150, overflow: "hidden",textOverflow: "ellipsis"}}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Join </Button>
      </CardActions>
    </Card>
  );
}