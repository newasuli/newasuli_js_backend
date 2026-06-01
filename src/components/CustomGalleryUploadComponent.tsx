import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { ApiClient, useNotice } from 'adminjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Input, Label, Text, TextArea } from '@adminjs/design-system';
import { BasePropertyProps, ActionProps } from 'adminjs';

const ImageUpload = (props: ActionProps) => {
  const { record } = props;
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>('');
  const [success, setSuccess] = React.useState<string | null>('');
  const sendNotice = useNotice();
  const navigate = useNavigate();
  const api = new ApiClient();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      // // Save file into AdminJS form state
    }
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleUpload = async (event: SyntheticEvent) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('image', selectedFile);

      const response = await axios.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      await api.resourceAction({
        resourceId: 'Gallery',
        actionName: 'new',
        data: {
          title,
          description,
          imageUrl: response.data.url,
          cloudinaryPublicId: response.data.public_id,
        },
      });
      sendNotice({
        message: 'Image uploaded successfully',
        type: 'success',
      });

      navigate('/admin/resources/Gallery');
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box backgroundColor="white" p={32} borderRadius={4} boxShadow="card">
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }} onSubmit={handleUpload}>
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
            {selectedFile ? (
              <>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </>
            ) : (
              <Text>Upload Image</Text>
            )}
          </Label>

          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            required
          />
        </Box>

        <Box width={1}>
          <Label htmlFor="title" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text variant="primary" color="primary100">
              *
            </Text>
            Title
          </Label>
          <Input
            width={1}
            variant="default"
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Box>
        <Box width={1}>
          <Label htmlFor="description">Description</Label>
          <TextArea
            width={1}
            variant="default"
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Button type="submit" variant="contained" label={loading ? 'Uploading...' : 'Upload'} disabled={loading} />
      </form>
    </Box>
  );
};

export default ImageUpload;
