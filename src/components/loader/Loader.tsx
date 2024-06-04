import { Center, HStack, Spinner, VStack, Flex } from '@chakra-ui/react';
import { Card, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Loader = ({ text = 'Loading...' }: { text?: string }) => {
  const { t } = useTranslation();
  return (
    <Flex height="100%" marginY={'auto'}>
      <Card
        sx={{
          p: 3,
          width: 1,
          maxWidth: 700,
        }}
        padding={20}
      >
        <VStack alignItems={'center'} spacing={3}>
          <Typography>{text}</Typography>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('pleaseWait')}
            </Typography>
          </Divider>

          <CircularProgress color="primary" />
        </VStack>
      </Card>
    </Flex>
  );
};

export default Loader;
