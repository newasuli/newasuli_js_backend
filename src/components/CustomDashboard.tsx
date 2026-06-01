import React from 'react';
import { useTranslation } from 'adminjs';
import { Box, Text, H1 } from '@adminjs/design-system';

const CustomDashboard = () => {
  const { translate } = useTranslation();

  return <Box width={1} textAlign="center" padding={5} bg="white"></Box>;
};

export default CustomDashboard;
