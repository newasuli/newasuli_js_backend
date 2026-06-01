import React from 'react';
import { Box, Button, H3 } from '@adminjs/design-system';
import { ShowPropertyProps } from 'adminjs';

const CustomShow = (props: ShowPropertyProps) => {
  const { record } = props;
  return (
    <img
      src={record.params.imageUrl}
      alt={record.params.title}
      style={{ width: '500px', height: '500px', objectFit: 'contain' }}
    />
  );
};

export default CustomShow;
