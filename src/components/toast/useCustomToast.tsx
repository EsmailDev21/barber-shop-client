import React from 'react';
import { Box, Text, VStack, useToast } from '@chakra-ui/react';
const useCustomToast = ({
  title,
  desc,
  duration = 5000,
  status = 'success',
  isClosable = true,
}: {
  title: string;
  desc?: string;
  duration?: number;
  status?: 'success' | 'error' | 'warning' | 'info';
  isClosable?: boolean;
}) => {
  const toast = useToast();
  return () =>
    toast({
      title,
      description: desc,
      duration,
      isClosable,
      status,
    });
};

export default useCustomToast;
