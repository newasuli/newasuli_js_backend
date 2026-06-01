import React from 'react';
import { ShowPropertyProps } from 'adminjs';
import { Box } from '@adminjs/design-system';

const RandomPicture: React.FC<ShowPropertyProps> = (props) => {
  const { record } = props;

  return (
    <img
      src={record.params.imageUrl}
      alt={record.params.title}
      style={{ width: 200, height: 200, objectFit: 'cover' }}
    />
  );
};

export default RandomPicture;
