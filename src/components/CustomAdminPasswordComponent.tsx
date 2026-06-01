import React, { useState, useEffect } from 'react';
import { Box, Button, Label, Input } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const ChangeAdminPassword = (props: BasePropertyProps) => {
  const { onChange, where, record } = props;
  const isEdit = record?.params.email ? true : false; // Assuming email is always present for existing records
  const [showForm, setShowForm] = useState(!isEdit);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
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
    setNewPassword('');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onChange) {
        onChange('password', newPassword);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [newPassword]);
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

          <Box width={1} marginBottom={32}>
            <Label htmlFor="newPassword" required>
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={handleChangePasswordChange}
              variant="default"
              width={1}
              required
            />
          </Box>

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
