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
    cover: string
    description: string
}

export default function CourseCard({id, name, cover, description}: Course) {
  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        sx={{ height: 250 }}
        title="green iguana"
      >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={cover} alt={name} fill />
      </div>
      </CardMedia>
      <CardContent>
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