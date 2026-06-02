import React from 'react';
import { Box, Button, H3 } from '@adminjs/design-system';
import { ShowPropertyProps } from 'adminjs';

const CustomShow = (props: ShowPropertyProps) => {
  const { record } = props;
  return (
    <Box width={1} flex flexDirection="column" alignItems="center" gap={2} marginBlock={24}>
      <img
        src={record.params.imageUrl}
        alt={record.params.title}
        style={{ height: '500px', objectFit: 'contain', marginInline: 'auto' }}
      />
    </Box>
  );
};

export default CustomShow;
