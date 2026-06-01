import React from 'react';
import { Box, Label, Text, Input } from '@adminjs/design-system';
import { ActionProps } from 'adminjs';

const CustomImageUploadComponent = (props: ActionProps) => {
  const { record } = props;
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <Box
      width={1}
      border="1px dashed #bbb"
      borderRadius="12px"
      height="350px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#fafafa"
      p={8}
      marginBottom={32}
    >
      <Label
        htmlFor="image-upload"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {record?.params.imageUrl ? (
          <>
            <img
              src={record?.params.imageUrl}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </>
        ) : (
          <Text>Upload Image</Text>
        )}
      </Label>
    </Box>
  );
};

export default CustomImageUploadComponent;
