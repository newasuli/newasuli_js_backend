import React, { useState, useEffect } from 'react';
import { Box, Button, Label, Input, FormGroup } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const ChangeAdminPassword = (props: BasePropertyProps) => {
  const { onChange, property, record } = props;
  const isEdit = !!record?.id;
  const [showForm, setShowForm] = useState(!isEdit);
  const [password, setPassword] = useState('');

  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    onChange?.(property.name, e.target.value);
  };

  const handleChangePasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowForm(!showForm);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowForm(false);
    onChange?.(property.name, '');
  };

  useEffect(() => {
    if (!isEdit) {
      setPassword(record?.params?.[property.name] || '');
    } else {
      setPassword('');
    }
  }, [record?.id]);

  return (
    <Box width={1} flex flexDirection="column" alignItems="center" gap={2}>
      {showForm && (
        <Box width={1} flex flexDirection="column" alignItems="center" gap={2}>
          {/* <Box width={1} marginBottom={32}>
            <Label htmlFor="oldPassword">Old Password</Label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                boxSizing: 'border-box',
              }}
            />
          </Box> */}

          <FormGroup width={1} marginBottom={32}>
            <Label htmlFor="newPassword" required>
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={password}
              onChange={handleChangePasswordChange}
              variant="default"
              width={1}
              required
            />
          </FormGroup>

          {/* // <Box width={1} marginBottom={32}>
          //   <Label htmlFor="confirmPassword">Confirm Password</Label>
          //   <input
          //     id="confirmPassword"
          //     type="password"
          //     value={confirmPassword}
          //     onChange={(e) => setConfirmPassword(e.target.value)}
          //     required
          //     style={{
          //       width: '100%',
          //       padding: '8px',
          //       borderRadius: '4px',
          //       border: '1px solid #ddd',
          //       boxSizing: 'border-box',
          //     }}
          //   />
          // </Box> */}
          {isEdit && (
            <Button type="button" onClick={handleCancel} variant="default">
              Cancel
            </Button>
          )}
        </Box>
      )}
      {!showForm && (
        <Button type="button" marginBottom={32} onClick={handleChangePasswordClick}>
          Change Password
        </Button>
      )}
    </Box>
  );
};

export default ChangeAdminPassword;
